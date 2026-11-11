#!/usr/bin/env python3
"""Phase 3 wave-1 blind lens "joint": Pi MII vs MW pi-host-integrity cross-program coherence.

Read-only on every repository. Writes only lens-joint.jsonl beside this file.
Every verbatim quotation is located in its source at generation time (d() for the twelve
program documents, c() for files in the two pinned worktrees); a quotation that is not an exact
substring of exactly one line aborts the run, so no row can carry a paraphrase as a quote.
Run: python3 -I gen-lens-joint.py
"""
import glob
import json
import os
import sys

BASE = "/workplace/jehallad/AgentEcosystem/ForgeWorkspaces/Pi/PiSubagents/scratch/mii-triage-1110"
DOCS = BASE + "/docs/"
PINS = BASE + "/pins/"
WORK = BASE + "/epistemic-triage/.work/"
PI = "pi-0fb90672"
MW = "mw-69cb016d"
RIG = "apps/development-rig/"

_cache = {}


def _lines(path):
    if path not in _cache:
        with open(path, encoding="utf-8") as handle:
            _cache[path] = handle.read().split("\n")
    return _cache[path]


def _find(path, snippet, nth):
    hits = [i + 1 for i, line in enumerate(_lines(path)) if snippet in line]
    if nth is None:
        if len(hits) != 1:
            sys.exit("QUOTE NOT UNIQUE (%d hits) in %s: %r" % (len(hits), path, snippet))
        return hits[0]
    if len(hits) < nth:
        sys.exit("QUOTE MISSING (%d hits, wanted #%d) in %s: %r" % (len(hits), nth, path, snippet))
    return hits[nth - 1]


def d(doc, snippet, nth=None):
    """Verbatim quotation from one of the twelve program documents, with its line number."""
    return '%s:%d "%s"' % (doc, _find(DOCS + doc, snippet, nth), snippet)


def c(pin, path, snippet, nth=None):
    """Verbatim quotation from a file in a pinned worktree, with its line number."""
    return "pins/%s/%s:%d `%s`" % (pin, path, _find(PINS + pin + "/" + path, snippet, nth), snippet)


def files_naming(pin, subdirs, token, suffixes=(".ts", ".tsx", ".js", ".mjs", ".json", ".md"), word=False):
    """Files under the given pin subdirectories whose text contains token (detector for absence rows).

    word=True matches the token only as a whole identifier (no letter, digit or underscore on either side).
    """
    import re
    pattern = re.compile(r"(?<![A-Za-z0-9_])" + re.escape(token) + r"(?![A-Za-z0-9_])") if word else None
    found = []
    for sub in subdirs:
        root = PINS + pin + "/" + sub
        if os.path.isfile(root):
            walk = [(os.path.dirname(root), [], [os.path.basename(root)])]
        else:
            walk = os.walk(root)
        for folder, dirs, names in walk:
            dirs[:] = [x for x in dirs if x not in ("node_modules", ".git", "dist")]
            for name in names:
                if not name.endswith(suffixes):
                    continue
                full = os.path.join(folder, name)
                try:
                    with open(full, encoding="utf-8", errors="replace") as handle:
                        text = handle.read()
                    if (pattern.search(text) if pattern else token in text):
                        found.append(os.path.relpath(full, PINS + pin))
                except OSError:
                    pass
    return sorted(found)


def expect_zero(pin, subdirs, tokens, word=False):
    """Assert that none of the tokens occurs under subdirs; returns a sentence stating the detector."""
    for token in tokens:
        hits = files_naming(pin, subdirs, token, word=word)
        if hits:
            sys.exit("EXPECTED ZERO but %r occurs in %s: %s" % (token, pin, hits[:5]))
    return "0 files under %s of pins/%s contain %sany of: %s" % (", ".join(subdirs), pin, "as a whole identifier " if word else "", ", ".join(tokens))


def doc_count(side, token):
    total = 0
    for path in sorted(glob.glob(DOCS + side + "-*.md")):
        with open(path, encoding="utf-8") as handle:
            total += handle.read().count(token)
    return total


def expect_doc_count(side, token, want):
    got = doc_count(side, token)
    if got != want:
        sys.exit("DOC COUNT %s %r: want %d got %d" % (side, token, want, got))
    return got


J = " | ".join

NODRIFT = ("None for the cited sources. The twelve documents are byte-identical to Pi master 3fc0ead1 and MW main "
           "6476372f (sha256 of each file compared with `git show <commit>:<path>`). No file under Pi src/, test/ or "
           "package.json differs between 0fb90672 and 3fc0ead1; no file under MW apps/*/src, packages/*/src, contracts/ "
           "or the rig package.json differs between 69cb016d and origin/main 0ffdc844.")

ROWS = []


def row(claim_ids, relation, evidence, detection, status, drift, note):
    ROWS.append({
        "lens": "joint",
        "claimIds": claim_ids,
        "relation": relation,
        "evidence": evidence,
        "detectionModel": detection,
        "proposedStatus": status,
        "drift": drift,
        "note": note,
    })

# ---------------------------------------------------------------------------------------------
# A. Pins, provenance and the joint absence baseline
# ---------------------------------------------------------------------------------------------
M05 = "qa/integration/pi-native-interoperability-2026-11-09/m05/installed-pi-consumer-l2-receipt.json"
M01 = "qa/integration/pi-native-interoperability-2026-11-09/m01/installed-host-l2-receipt.json"
with open(PINS + MW + "/" + M05, encoding="utf-8") as _h:
    _m05 = json.load(_h)
with open(PINS + MW + "/" + M01, encoding="utf-8") as _h:
    _m01 = json.load(_h)
TARBALLS = sorted(_m05["tarballs"].keys())
assert TARBALLS == ["@mechanical/development-rig", "@mechanical/workflows-coordination", "@mechanical/workflows-development"], TARBALLS
assert "dist/host.js" in _m05["tarballs"]["@mechanical/development-rig"]["files"]
assert _m01["pi_invocation_id"] is None and _m01["claude_session_id"] is None and _m01["schema"] == "mw.pi-interop-receipt.v1"

row(
    ["C003", "C002"],
    "SUPPORTS",
    J([
        d("pi-README.md", "**Paired Mechanical snapshot:** 69cb016dd293a17bcc893f2baf410a51c226f4c9, with an additional main commit observed while authoring; re-pin both before implementation."),
        "versus " + d("mw-README.md", "**Source baseline:** MechanicalWorkflows 1be2b8dc7e1e852fd35f9b6e3347386377c3f371; Pi-subagents 0fb9067262532289104417d2b7f2f25704563a75 before Pi design commit."),
        d("mw-01-AUDIT-AND-PROOF.md", "**Read-only source baseline:** Mechanical main 1be2b8d; Pi master 0fb9067 at review."),
        "Git, read-only (`git --no-optional-locks -C pins/mw-69cb016d`): `rev-list --parents -1 1be2b8dc` -> parent 69cb016dd293a17bcc893f2baf410a51c226f4c9; `rev-list --count 69cb016d..1be2b8dc` = 1 and `1be2b8dc..69cb016d` = 0; `diff --stat 69cb016d 1be2b8dc` = apps/development-rig/test/host-services.test.ts (two test titles gain the prefixes 'MW-R2 EAT-R027:' and 'MW-R2 EAT-R038') and docs/programs/pi-native-interoperability-2026-11-09/04-IDENTIFIER-MAPPING.md (the MW-R2 row); `branch -a --contains 69cb016d` lists remotes/origin/main",
        "Order of events from committer dates: MW 69cb016d 2026-11-10T17:47:28Z; Pi 0fb90672 2026-11-11T00:23:06Z; MW 1be2b8dc 2026-11-11T03:54:09Z; Pi design commit 91d8fa8c 2026-11-10T20:22:15-08:00 (parent 0fb90672); MW design commit 6476372f 2026-11-10T20:27:41-08:00 (parent 1be2b8dc); Pi 3fc0ead1 2026-11-10T20:27:58-08:00 (parent 91d8fa8c)",
        "Companion program directory exists at MW 6476372f: docs/programs/pi-host-integrity-2026-11-10/ (README + 01..05), sha256 of each file equal to the scratch copy",
        "Default branches: `symbolic-ref refs/remotes/origin/HEAD` gives refs/remotes/origin/master in the Pi repository and refs/remotes/origin/main in the Mechanical repository; `merge-base --is-ancestor 0fb90672 origin/master` exits 0",
    ]),
    "",
    "ESTABLISHED",
    "The two programs name different Mechanical baselines: Pi 69cb016d, MW its direct child 1be2b8dc. The one-commit delta touches no file under apps/*/src, packages/*/src or contracts/. MW origin/main has since moved to 0ffdc844 (one further commit after the MW design commit: a test title in post-dispatch-abort.test.ts and one mapping row); the source the two programs audit is still identical to 69cb016d.",
    "All four facets of C003 hold. The 'additional main commit observed while authoring' is exactly 1be2b8dc, which existed about half an hour before the Pi design commit, and the companion's stated Pi baseline is the same 0fb90672. The literal disagreement between the two 'paired' SHAs is disclosed on the Pi side only and is behaviourally empty, so every Mechanical-source premise judged at 69cb016d transfers unchanged to the companion's baseline. Residual defect: neither README states what the delta is, so a reader comparing the two headers sees two different Mechanical revisions under the word 'paired'. Remediation ADD_TEMPORAL_QUALIFIER: name 1be2b8dc in the Pi header, or pin both programs to one pair at the re-pin both demand.",
)

row(
    ["C073", "C077", "C022", "C214", "C215"],
    "SAME_ORIGIN_AS",
    J([
        "Provenance: both design deposits carry the same author identity and were committed within six minutes: `git log -1 --format='%an <%ae> %cI'` gives James Halladay <54321627+jehalladay@users.noreply.github.com> for Pi 91d8fa8c (2026-11-10T20:22:15-08:00), MW 6476372f (20:27:41-08:00) and Pi 3fc0ead1 (20:27:58-08:00). The companion therefore is the same evidentiary lineage as the Pi program, and its agreement is not a second witness",
        "Independent witnesses at the pins. C073/C214: " + c(MW, RIG + "package.json", '"./host": {') + "; " + c(MW, RIG + "src/host.ts", "export async function invokeDevelopmentHost(options: DevelopmentHostOptions, input: unknown): Promise<DevelopmentOutcome> {") + "; " + c(MW, RIG + "src/host.ts", "readonly services: DevelopmentServices;") + " (the options hold artifact path/digest, descriptor bytes/digest and the four services; no binding, grant, source or lease member)",
        "C215: " + c(MW, "packages/development/src/contracts.ts", "readonly discover: (request: DevelopmentRequest) => Promise<ScopeResult>;") + " followed by compileContext, implement and verify, and the four-arm union ending " + c(MW, "packages/development/src/contracts.ts", '| { readonly kind: "indeterminate"; readonly reason: string; readonly evidence?: EvidenceRef };'),
        "C077: " + c(MW, M05, "installed-pi-consumer-conformance-fixture-L2: fixture callbacks over real packed bytes; no Pi registration, no live SDK, no native provider proof"),
        "C022, Pi side: " + c(PI, "src/workbench/execute-tool.ts", 'refuse("unsupported-definition-kind", "only script definitions launch in this host");') + "; " + c(PI, "src/index.ts", "launchEmbedded: launchEmbeddedWorkflow,", 1) + "; " + c(PI, "src/index.ts", "launchDetached: launchDetachedWorkflow,", 1),
        "C022, Mechanical side: " + expect_zero(MW, ["apps", "packages"], ["workflow_execute"]),
        "Companion wording, same lineage: " + d("mw-README.md", "Despite \"pi-consumer\" name, they do NOT invoke Pi's registered function tool or native L4.") + " and " + d("pi-01-AUDIT-AND-INVARIANTS.md", "Do NOT conflate an independently installed Node consumer named pi-consumer with actual Pi tool execution."),
    ]),
    "For the absence in C022: (a) every non-script definition is refused in the one registered execute tool before any source is resolved or launcher called, and src/index.ts supplies only the two script launchers; (b) text search of Pi src/ for the rig package name 'development-rig' finds 0 files and for '@mechanical/' finds exactly one, the allowlist literal in mechanical-descriptor.ts; Pi package.json declares no @mechanical dependency; (c) text search of MW apps/ and packages/ for 'workflow_execute' finds 0 files. Power: complete for static reachability in the pinned source of both repositories; blind to code outside the two worktrees.",
    "ESTABLISHED",
    NODRIFT,
    "These five baseline statements are established by pinned source and one committed receipt, not by the fact that the two programs agree with each other. The agreement between the Pi baseline bullets and the companion's 'What is already built' list should be recorded as one lineage in the source map. Scope of 'ESTABLISHED': static source text and a committed receipt file at 69cb016d and 0fb90672; no test was executed by this lens.",
)

row(
    ["C019", "C020", "C068"],
    "SUPPORTS",
    J([
        "C019 ('shipped', i.e. in the packed artifact): the committed M05 receipt lists the packed rig tarball's files and dist/host.js is among its 182 entries (asserted by this generator from " + "pins/" + MW + "/" + M05 + " key tarballs['@mechanical/development-rig'].files); the rig manifest publishes only dist and README.md and maps ./host to dist/host.js (" + c(MW, RIG + "package.json", '"import": "./dist/host.js",') + ")",
        "C020/C068: " + c(MW, RIG + "test/installed-pi-consumer-conformance.test.ts", 'test("the committed M05 receipt, when present, is an L2 MW-INSTALLED-HOST record with every adverse row and never a native proof", () => {') + "; " + c(MW, M05, '"label": "MW-INSTALLED-HOST",') + "; " + c(MW, M05, '"evidence_tier": "L2",') + "; the M01 receipt (" + "pins/" + MW + "/" + M01 + ") carries schema mw.pi-interop-receipt.v1, evidence_tier L2, pi_invocation_id null and claude_session_id null",
        "The M05 receipt records three packed tarballs, not one: " + ", ".join(TARBALLS),
    ]),
    "",
    "SUPPORTED",
    "The receipts were produced at earlier Mechanical commits (M05 mechanical_base_sha c8be64da, an ancestor of 69cb016d; M01 at 24ef8984 against Pi b085c34e). They are evidence at those revisions; no pack or install was re-run at 69cb016d by this lens.",
    "The subpath, the L2 installed-consumer test and two L2 receipts exist at the pin. 'Shipped' and 'L2 evidence exists' rest on committed producer receipts, which are reports of a pack and a run rather than something re-executed here, hence SUPPORTED and not ESTABLISHED. The receipts themselves bound their scope: fixture callbacks, no Pi registration, no live SDK. Their known_gaps list states 'no Pi P-descriptor/P-contract coordination was performed'.",
)

_tiers = set()
for _folder, _dirs, _names in os.walk(PINS + MW + "/qa"):
    for _name in _names:
        if _name.endswith(".json"):
            with open(os.path.join(_folder, _name), encoding="utf-8") as _h:
                _text = _h.read()
            _i = _text.find('"evidence_tier"')
            while _i != -1:
                _q1 = _text.index('"', _text.index(":", _i) + 1)
                _q2 = _text.index('"', _q1 + 1)
                _tiers.add(_text[_q1 + 1:_q2])
                _i = _text.find('"evidence_tier"', _q2)
assert _tiers == {"L1", "L2"}, _tiers
_pi_receipts = files_naming(PI, ["docs/workbench/receipts", "qa"], "mechanical.development.develop.v1")
assert _pi_receipts == ["docs/workbench/receipts/wb-201v.md", "docs/workbench/receipts/wb-ocie.md"], _pi_receipts
assert files_naming(PI, ["src"], "@mechanical/") == ["src/workbench/mechanical-descriptor.ts"]

row(
    ["C023", "C024", "C025"],
    "SUPPORTS",
    J([
        "Pi side: no function launch path exists at 0fb90672 (" + c(PI, "src/workbench/execute-tool.ts", 'refuse("unsupported-definition-kind", "only script definitions launch in this host");') + "); " + expect_zero(PI, ["src"], ["development-rig"]) + "; of the 72 files in docs/workbench/receipts only wb-201v.md and wb-ocie.md name mechanical.development.develop.v1, and both are the receipts of the two unwired seams (function-authority and descriptor boundary)",
        "Mechanical side: every committed receipt under qa/ that carries an evidence_tier says L1 or L2 (set asserted by this generator: " + ", ".join(sorted(_tiers)) + "); the M01 receipt has pi_invocation_id null and claude_session_id null; the M05 receipt scope reads 'no Pi registration, no live SDK, no native provider proof'",
        "C025: the only writer lease in either pinned source is Pi's in-process map (" + c(PI, "src/workbench/source-admission.ts", "readonly #held = new Map<string, WriterLease>();") + "; " + c(PI, "src/workbench/source-admission.ts", "One WriterLeases registry binds the") + " writers of one host process); " + expect_zero(MW, [RIG + "src", RIG + "test"], ["WriterLeases", "writerLease", "leaseGeneration", "fencingGeneration", "fenceToken", "fencingToken", "ownerId"]),
        "The companion states the same absences, same lineage: " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I12 — P1 joint absence:** no registered Pi-to-Mechanical L4 journey, despite named fixture L2."),
    ]),
    "Surfaces searched: Pi src/ (route reachability), Pi docs/workbench/receipts and qa/ (receipts naming the function id), MW qa/ (every JSON receipt's evidence_tier), MW apps/development-rig src and test (lease and fencing identifiers). Power: a joined receipt needs a function launch route, and none is reachable in the pinned Pi source, so a receipt produced at this revision is excluded; committed receipts at both pins are covered exhaustively by the tier and function-id searches. Not covered: uncommitted local files, other branches (MW origin/camshaft/* and origin/seat/* were not scanned) and receipts kept outside the two repositories.",
    "SUPPORTED",
    NODRIFT,
    "The three absence statements are supported by a detector with stated reach rather than by the companion's concurrence. They are universal negatives over 'any receipt or proof', so they are capped at SUPPORTED: the search is exhaustive for committed artifacts at the two pins and for route reachability, and silent about anything outside them. C025's word 'compatible' has no referent yet: Mechanical has no lease or fence code for a Pi lease to be compatible with (see the lease rows).",
)

# ---------------------------------------------------------------------------------------------
# B. D1-D12 ledger: ownership, severity and the embedded Mechanical premises
# ---------------------------------------------------------------------------------------------
import re as _re


def _dnums(side):
    seen = {}
    for path in sorted(glob.glob(DOCS + side + "-*.md")):
        with open(path, encoding="utf-8") as handle:
            for number, line in enumerate(handle.read().split("\n"), 1):
                for match in _re.finditer(r"\bD(1[0-2]|[1-9])\b", line):
                    seen.setdefault(match.group(0), []).append("%s:%d" % (os.path.basename(path), number))
    return seen


_pi_d = _dnums("pi")
_mw_d = _dnums("mw")
assert sorted(_mw_d) == sorted(["D1", "D2", "D4", "D6", "D7", "D8", "D10", "D11", "D12"]), sorted(_mw_d)
assert all(len(v) == 1 and v[0].startswith("mw-01") for v in _mw_d.values())
for _label in ("D1", "D2", "D4", "D7", "D8", "D10", "D11", "D12"):
    assert _pi_d[_label] == ["pi-README.md:27"], (_label, _pi_d[_label])
for _label in ("D3", "D5", "D6", "D9"):
    assert sorted(x.split(":")[0] for x in _pi_d[_label]) == ["pi-01-AUDIT-AND-INVARIANTS.md", "pi-README.md"], (_label, _pi_d[_label])

row(
    ["C032"],
    "CONTRADICTS",
    J([
        "Two owners for D6. Pi: " + d("pi-README.md", "Pi owns: P0 canonical admitted input vs dispatched input (D3); P0 invocation-scoped writer ownership (D5); P0 composed authority/routing (D6/D9); real observation, journal, controls, lifetime and load.") + " and " + d("pi-01-AUDIT-AND-INVARIANTS.md", "| PI-I03 / D6 | src/workbench/execute-tool.ts; src/index.ts | Registered tool supports script only; function authority, descriptor/source guards and Mechanical host are not transitively wired. | Pi P04/P05 |"),
        "Mechanical: " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I04 / D6 — P0 host composition:** invokeDevelopmentHost accepts artifacts+services but not mechanical.pi-host/v1 binding, effective grants, source authority or active lease."),
        "The sentence under audit: " + d("pi-README.md", "D8/D10/D11/D12 are shared or Mechanical-owned as described in this corpus."),
        "Where those four are described, and by whom: " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I06 / D8 — P1 partial projection:**") + "; " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I07 / D10 — P2 malformed descriptor typing:**") + "; " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I08 / D11 — P1 provider runtime:**") + "; " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I09 / D12 — P1 confinement:**"),
        "Origin of the numbering is outside both corpora: " + d("pi-01-AUDIT-AND-INVARIANTS.md", "original deep-audit candidate references are hypotheses until a red test exercises them."),
        "A second D-namespace already lives in the Pi repository: " + c(PI, "docs/workbench/18-decisions-and-risks.md", "D11: Side-effect retry is producer-specific, never generic."),
    ]),
    "Regex \\bD(1[0-2]|[1-9])\\b over the six pi-*.md and the six mw-*.md files (asserted by this generator). Pi corpus: D1, D2, D4, D7, D8, D10, D11 and D12 occur only at README line 27; D3, D5, D6 and D9 occur there and once each in the 01 ledger. MW corpus: D1, D2, D4, D6, D7, D8, D10, D11, D12 once each, all in 01; D3, D5 and D9 never. Power: complete for literal D-labels in the twelve files; blind to a description that omits its label (pi-01 section C's 'no sandbox claim from SDK prompt/tool filters' restates the substance of D12 unlabeled). `git grep -lw D12` over Pi 3fc0ead1 outside the triage directories lists 13 other paths; the twelve text files were each read at a D12 line (the thirteenth, media/demo.mp4, is binary): docs/workbench/18-decisions-and-risks.md (adopted decisions D01..D14), one GP call-site receipt (wb-1xvp.3.md), three GP rosters and case files, five census tests and two Beads archives (gate-mutant and census row labels); none defines these defects, so the D-label family is already overloaded in the Pi repository.",
    "REFUTED",
    NODRIFT,
    "C032 is a conjunction and two conjuncts fail. Facet (ii): the Pi corpus never describes D8, D10, D11 or D12; the only Pi sentence naming them is the one asserting they are described. If 'this corpus' is read as the joint corpus, they are described only in mw-01 and each is a Mechanical item (MW-I06..MW-I09); none is marked shared. Facet (iii): D6 is claimed by both programs with different content and different owners (Pi: the registered tool is not wired, Pi P04/P05; Mechanical: the exported host ABI does not require composition, MW H06). Facet (i) survives only under the joint reading: D1, D2, D4 and D7 are labels without descriptions in the Pi files. Neither corpus lists D1..D12 in one place, and the 'original deep-audit' that numbered them is in neither program directory. Narrower proposition the evidence supports: the union of pi-01 section A and the mw-01 ledger gives every D-number at least one owner. Remediation SURFACE_DISAGREEMENT (state D6 as a two-part shared defect with one owner per half) and REPLACE_SOURCE (cite mw-01 for D8/D10/D11/D12 instead of 'this corpus').",
)

row(
    ["C031"],
    "CONFLICTS_WITH",
    J([
        d("pi-README.md", "Mechanical owns: P0 strict Forge proof (D1/D7), P0 negative-effect semantics (D2), packed executable closure (D4), native service binding and provider receipts."),
        d("pi-README.md", "A P0 here is a blocker for this target release, not a claim of a current exploitable Pi function route."),
        "Pi calls the whole Mechanical handoff blocking: " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "## Mechanical producer handoff — exact blocking dependencies") + "; " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "H01: @mechanical/development-rig/host accepts validated mechanical.pi-host/v1 binding and exact immutable package/runtime manifest; reject malformed descriptors with typed errors.") + "; " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "H02: production four callbacks composed from native Git census/plain task, Claude Agent SDK and Forge gate; provider SDK/runtime identity pinned; no nested developLive within implement callback.") + "; " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "H04: effect-intent and reconciliation report producer-native effects and bounded non-occurrence proof, no blind replay; durable file fsync checks."),
        "Mechanical grades the same items lower: " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I05 / D4 — P1 executable closure:**") + "; " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I07 / D10 — P2 malformed descriptor typing:**") + "; " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I08 / D11 — P1 provider runtime:**") + "; " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I10 — P1 persistence:**") + "; " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I12 — P1 joint absence:** no registered Pi-to-Mechanical L4 journey, despite named fixture L2."),
        "while its own packets and vetoes treat them as release-blocking: " + d("mw-03-IMPLEMENTATION-PACKETS.md", "### H03 — Verified installed executable and provider closure (P1/P0 dependency)") + "; " + d("mw-03-IMPLEMENTATION-PACKETS.md", "### H04 — Descriptor and closed binding validator (P1)") + "; " + d("mw-03-IMPLEMENTATION-PACKETS.md", "### H08 — Registered Pi joint native acceptance (P0; H05–H07 + Pi P05–P07)") + "; " + d("mw-04-VERIFICATION-AND-RELEASE.md", "- Installed artifact or dependency bytes differ from admitted executable manifest.") + "; Pi side " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "| G09 | installed JS mutation after tarball extraction | refuse before trusted import |"),
        "Label drift on D7: Pi groups it under 'strict Forge proof (D1/D7)'; Mechanical names it " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I02 / D7 — P0 effect-intent settlement:**"),
    ]),
    "",
    "NON-EPISTEMIC",
    NODRIFT,
    "Ownership and severity are decisions, so the row is not graded as true or false; the two programs record different decisions for the same items. (1) D6 is owned by Pi in the Pi README and is a Mechanical P0 in mw-01. (2) Pi defines P0 as 'a blocker for this target release' and titles every Mechanical handoff item an exact blocking dependency, yet Mechanical rates the matching defects P1 (D4 executable closure, D11 provider runtime, MW-I10 persistence) and P2 (D10 malformed descriptor typing); mw-03 itself hedges D4 as 'P1/P0 dependency'. (3) The joint absence that the whole Pi program exists to close is P1 in mw-01 (MW-I12) and P0 in mw-03 (H08) and in Pi (P05, P08). A bead keyed only by a D-number or a severity would inherit whichever program it was copied from. Needs an owner ruling per item; remediation SURFACE_DISAGREEMENT.",
)

with open(PINS + MW + "/" + RIG + "src/live-development.ts", encoding="utf-8") as _h:
    assert "projectForgeVerification" not in _h.read()

row(
    ["C033"],
    "ENTAILS",
    J([
        "(i) D1, Forge verification is not strict: " + c(MW, RIG + "src/live-gate.ts", 'if (data["gate_passed"] === false || frame["terminal_fact"] !== "completed") {') + " then " + c(MW, RIG + "src/live-gate.ts", 'return { ...bound, kind: "passed", reason: "FORGE_GATE_PASS" };') + " (only an explicit false refuses; an absent gate_passed passes); a missing gate definition or unpinned environment is recorded, not refused: " + c(MW, RIG + "src/live-gate.ts", 'gateDefinition: data !== null && data["gate_definition"] !== undefined && data["gate_definition"] !== null ? "native" : "descriptor",'),
        "the standalone producer credits that observation on a commit match alone: " + c(MW, RIG + "src/live-development.ts", 'verdict: !matchesCandidate ? "unknown" : forge.kind === "passed" ? "passed" : forge.kind === "failed" ? "failed" : "unknown",') + "; the stricter projectForgeVerification of host-services.ts is not referenced anywhere in live-development.ts (asserted by this generator)",
        "D7, settlement from local measurements: " + c(MW, RIG + "src/live-development.ts", "verifiedTree: matches ? gate.basis.tree : null, gateDefinitionSha256: gateManifestSha256, forgeOperationId: gate?.operationId ?? null,"),
        "(ii) D2, negative-effect inference: " + c(MW, RIG + "src/effect-reconciliation.ts", 'return decided("writer", "not-occurred", { system: "git", kind: "head-at-base-clean-worktree", id: head });') + " with " + c(MW, RIG + "src/effect-reconciliation.ts", 'return { effect, disposition, retryPermitted: disposition === "not-occurred" && evidence !== null, evidence };'),
        "(iii) D4, executable closure: the last check before the trusted import re-hashes the tarball, not the installed files: " + c(MW, RIG + "src/installed-host.ts", 'if (await digestFile(artifact) !== options.artifactDigest) throw new Error("ENTRYPOINT_ARTIFACT_MISMATCH: artifact bytes changed before import");') + " after " + c(MW, RIG + "src/installed-host.ts", 'const url = pathToFileURL(join(base,"dist","index.js")).href;'),
        "Companion statements of the same gaps, same lineage as the Pi program: " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I01 / D1 — P0 native PASS gap:** classifyGateResponse reports passed when gate_passed is absent (only explicit false rejects)") + "; " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I03 / D2 — P0 negative effect law:** reconcileUncertainEffect classifies HEAD===base+clean status as not-occurred/retryPermitted."),
    ]),
    "",
    "ESTABLISHED",
    "The companion audited 1be2b8dc; the files quoted here are byte-identical at 69cb016d, 1be2b8dc and origin/main 0ffdc844 (no file under apps/*/src differs).",
    "The three Mechanical premises behind the README's ownership labels are entailed by the source text at the paired snapshot: the classifier passes a frame whose gate_passed is absent, the standalone path turns that into a passed verdict on a commit match, settlement is fed the locally measured tree and cached manifest hash, a clean HEAD at base returns retryPermitted true, and the installed dist/index.js is imported after a tarball re-hash with no per-file check. Scope of ESTABLISHED: static reading of the pinned source; the README cites none of this and neither program executed a test, so behaviour under a real Forge frame is entailed by the code path, not observed. D4 is entailed for the library tarball that the host installs; the rig host package that Pi itself would import is outside this code path (see the artifact row).",
)

# ---------------------------------------------------------------------------------------------
# C. Handoff labels and the two dependency graphs
# ---------------------------------------------------------------------------------------------
IDMAP = "docs/programs/pi-native-interoperability-2026-11-09/04-IDENTIFIER-MAPPING.md"
with open(PINS + MW + "/" + RIG + "src/host.ts", encoding="utf-8") as _h:
    _host_ts = _h.read()
for _token in ("effect-intent", "effect-reconciliation", "progress-stages", "ProgressCallback", "signal"):
    assert _token not in _host_ts, _token

row(
    ["C142", "C163"],
    "CONTRADICTS",
    J([
        "Pi uses Mechanical H-labels as packet dependencies: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "Mechanical H01/H02/H03 host, native proof, services") + "; " + d("pi-03-IMPLEMENTATION-PACKETS.md", "### P04 — Reviewed installed host consumer (P0; MW H01/H02)"),
        "Pi's own meaning of the labels: " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "H01: @mechanical/development-rig/host accepts validated mechanical.pi-host/v1 binding and exact immutable package/runtime manifest; reject malformed descriptors with typed errors.") + "; " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "H03: strict verification evidence with candidate commit/tree, gate definition/hash, required environment and pass completeness; legacy-weak PASS never promoted."),
        "Mechanical's meaning of the same labels: " + d("mw-03-IMPLEMENTATION-PACKETS.md", "### H01 — Native Forge certificate and strict verification projection (P0)") + "; " + d("mw-03-IMPLEMENTATION-PACKETS.md", "### H02 — Durable effect and non-occurrence semantics (P0)") + "; " + d("mw-03-IMPLEMENTATION-PACKETS.md", "### H03 — Verified installed executable and provider closure (P1/P0 dependency)"),
        "What Mechanical says Pi P04 consumes: " + d("mw-05-OPERATIONS-AND-HANDOFF.md", "| H03 exact executable manifest | Pi P04 installed host | checked archive hash only |") + "; " + d("mw-05-OPERATIONS-AND-HANDOFF.md", "| H04 closed binding and allowedEffects | Pi P03/P04 composed admission | schema-valid but caller-authored privilege |") + "; " + d("mw-05-OPERATIONS-AND-HANDOFF.md", "| H06 composed host entrypoint | Pi P04/P05 authority transitivity | independent helpers called optionally |"),
    ]),
    "Search the six Mechanical documents for the heading of every H01..H12 packet and the six Pi documents for the H01..H05 handoff definitions; the complete lists are quoted in this and the following row. Power: complete for definitions in those twelve files; no outside mapping is claimed. In particular, the Pi H01/H02 definitions name a different pair of tasks from the Mechanical H01/H02 headings.",
    "REFUTED",
    NODRIFT,
    "PREMISE GRADED: that 'MW H01/H02' (P04) and 'Mechanical H01/H02/H03' (P08) name definite Mechanical packets with the content Pi intends. They do not. Read in the Mechanical program's own numbering, P04 would wait on the strict Forge certificate and the negative-effect law, which P04 does not consume, and would not wait on the installed-runtime closure, the closed binding and the composed entrypoint (MW H03, H04, H06), which it does. The labels resolve only inside pi-05, to handoff items Pi wrote for Mechanical, so the Pi dependency is on work that no Mechanical packet carries under that number. The packets themselves are proposals and stay NON-EPISTEMIC; what is refuted is the cross-corpus reference. Remediation REPLACE_SOURCE: cite Mechanical packets by the mw-03 numbers, or prefix the Pi handoff labels so they cannot be mistaken for them.",
)

row(
    ["C221"],
    "SUPPORTS",
    J([
        "Namespace 1, Pi handoff items: " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "H02: production four callbacks composed from native Git census/plain task, Claude Agent SDK and Forge gate; provider SDK/runtime identity pinned; no nested developLive within implement callback.") + "; " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "H04: effect-intent and reconciliation report producer-native effects and bounded non-occurrence proof, no blind replay; durable file fsync checks.") + "; " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "H05: shared tests, installed host V2, registered Pi tool V3, native V4, recovery V5; exact owner and operation receipt."),
        "Namespace 2, Mechanical packets: " + d("mw-03-IMPLEMENTATION-PACKETS.md", "### H04 — Descriptor and closed binding validator (P1)") + "; " + d("mw-03-IMPLEMENTATION-PACKETS.md", "### H05 — Compose native four services without recursion (P0; H01/H02)") + "; " + d("mw-03-IMPLEMENTATION-PACKETS.md", "### H06 — Authorized composed application host (P0; H03/H04/H05)") + "; " + d("mw-03-IMPLEMENTATION-PACKETS.md", "### H07 — First-class producer progress/recovery protocol (P0; H02/H05/H06)"),
        "Namespace 3, the Mechanical README's 'priority architecture decisions', which disagree with mw-03 from H03 on: " + d("mw-README.md", "H01 strict native Forge eligibility and candidate/tree/manifest/environment evidence; H02 durable effect and non-occurrence law; H03 compose trusted host binding and exact service callbacks; H04 pin executable runtime closure; H05 process cancellation/journal/producer identity; H06 real joint Pi handoff; H07–H09 adversarial, load, docs/skill release tail."),
        "Namespace 4, Mechanical admission steps: " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "H1 validate serialized host binding shape/version/profiles, verify trusted host ownership and workspace realpath, committed Git base commit/tree and clean status, original forge.toml hash.") + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "H5 persist intent and only then call provider writer."),
        "The Mechanical repository already names this collision class for its previous program: " + c(MW, IDMAP, "`ID_MAP_SUFFIX_COLLISION` — two ids in one family share a numeric suffix (`MW-R01` and `MW-R1`).") + " and " + c(MW, IDMAP, "`ID_MAP_ID_UNMAPPED` — a program document references an id that the mapping table holds no row for."),
    ]),
    "",
    "ESTABLISHED",
    NODRIFT,
    "C221 is correct and understates the problem: four H-numberings are in play, three of them inside the Mechanical program. Translation by content: Pi H01 = mw-03 H06 with H03 and H04; Pi H02 = mw-03 H05; Pi H03 = mw-03 H01; Pi H04 = mw-03 H02 with H07; Pi H05 = mw-03 H08 to H10 plus the H00 fixtures. The Mechanical README's H03 to H06 match neither list (its H03 is the composed binding, mw-03's is runtime closure; its H06 is the joint handoff, mw-03's is the composed host). mw-02's H1 to H6 are admission steps one zero away from packets H01 to H06. The November 9 Mechanical program shipped an identifier mapping with a validator that refuses exactly this suffix collision and any unmapped identifier; the new program ships no mapping, and that validator reads only the November 9 documents. Remediation: one joint identifier table (label, owner, repository, content) before any bead is keyed by an H-label.",
)

row(
    ["C139", "C141", "C169", "C174"],
    "CONTRADICTS",
    J([
        "Pi draws Mechanical edges only into P04 and P08: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "+-> P02 durable lease/fencing ----------+--> P04 composed admission --> P05 registered function launcher") + "; " + d("pi-03-IMPLEMENTATION-PACKETS.md", "+-> P06 observation contract [parallel] -+-------------+---------------------+--> P07 journal/control/reconcile") + "; " + d("pi-03-IMPLEMENTATION-PACKETS.md", "### P06 — Producer-qualified observation bridge (P0; parallel with P04)") + "; " + d("pi-03-IMPLEMENTATION-PACKETS.md", "### P07 — Durable invocation journal, controls and reconciliation (P0; P02/P05/P06)"),
        "yet the packet bodies consume Mechanical work: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Change:** workflow_control/workflow_reconcile adapters, host journal and lease state; integrate Mechanical effect-intent lookup.") + "; " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Implement:** native refs + Pi invocation correlation; typed stages and raw Mechanical four domain results; strict/weak/unknown gate assurance; bounds/drop/freshness semantics. No results invented when provider missing."),
        "The companion's consumer table names the missing edges: " + d("mw-05-OPERATIONS-AND-HANDOFF.md", "| H01 strict native certificate | Pi P06 observation, P08 native release | Forge PASS string or local HEAD |") + "; " + d("mw-05-OPERATIONS-AND-HANDOFF.md", "| H02 native effect disposition | Pi P02/P07 writer fencing/recovery | clean git status as universal non-occurrence |") + "; " + d("mw-05-OPERATIONS-AND-HANDOFF.md", "| H07 producer progress/native refs | Pi P06/P07 scoped observation | synthesized session/operation ids |") + "; " + d("mw-05-OPERATIONS-AND-HANDOFF.md", "| H05 native provider callbacks | Pi P05 real registered dispatch | direct developLive or shell script wrapper |"),
        "P05 by Pi's own tier needs no native provider: " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "V3: actual registered workflow_execute(function) with deterministic four callbacks and workflow_observe, no native provider claim.") + " and " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Done:** V3 recorded through Pi registration, not a direct host-helper call."),
        "Pinned code: the only importable Mechanical surface is the host facade (" + c(MW, RIG + "package.json", '"./package.json": "./package.json"') + " is the sole export beside ./host), and that facade exports " + c(MW, RIG + "src/host.ts", 'export { HostBindingError, WRITE_GRANT, admitHostBinding, dispatchWriteAtFinalBoundary, validateHostBinding } from "./host-binding.js";') + " plus invokeDevelopmentHost, HostAdmissionError and HOST_API_VERSION; host.ts contains none of effect-intent, effect-reconciliation, progress-stages, ProgressCallback or signal (asserted by this generator). Pi's rule: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Pi consumes only @mechanical/development-rig/host and exact pinned tarballs;"),
        "Pi's own Forge observer cannot compute the assurance P06 must show: " + expect_zero(PI, ["src"], ["gate_passed", "gate_definition", "execution_environment"]),
        "Inside the Mechanical program the graph and the headings also differ: " + d("mw-03-IMPLEMENTATION-PACKETS.md", "+--> H02 negative effect/recovery --------+--> H06 composed host authority ---> H08 real joined Pi journey") + " against the H06 heading '(P0; H03/H04/H05)' quoted in the label row",
    ]),
    "Two absences carry this row. (a) No effect-intent, reconciliation or progress surface is importable from the rig: read of the two-key exports map in the rig package.json and of every export statement in src/host.ts at 69cb016d, plus a generator assertion that host.ts contains none of the strings effect-intent, effect-reconciliation, progress-stages, ProgressCallback or signal. Power: complete for what a package-specifier import can reach. (b) Pi's own Forge observation cannot judge the strict axes: text search of Pi src/ for gate_passed, gate_definition and execution_environment finds 0 files. Power: complete for those field names in pinned source; a reader that reached them through a generic record walk would be missed, and none was found in forge-operation-observer.ts or native-evidence.ts.",
    "REFUTED",
    NODRIFT,
    "PREMISE GRADED: that the Pi dependency graph and packet headings state the complete set of Mechanical prerequisites: none for P02, P06 and P07, and for P05 only what it inherits through P04. Pi's own packet text and the pinned code contradict it. P07 must 'integrate Mechanical effect-intent lookup', and no effect-intent or reconciliation function is reachable through the one subpath Pi allows itself to import. P06 must show strict, weak or unknown gate assurance and typed producer stages; Pi's Forge observer reads no gate_passed, gate_definition or execution_environment, and the facade takes no progress callback, so both arrive only with Mechanical H01 and H07, and H07 sits behind H02, H05 and H06 in the Mechanical order. In the other direction the companion makes P05 a consumer of native provider callbacks, while Pi defines P05's exit tier as deterministic callbacks with no native provider. The two programs therefore schedule the same packets differently. The packet orders are proposals and stay NON-EPISTEMIC; the refuted item is the completeness of the Pi graph's cross-repository edges. Consequence for beads: P06 and P07 cannot close before Mechanical H07 exports exist, and whether P05 waits for H05 needs a ruling.",
)

row(
    ["C173"],
    "SPECIALIZES",
    J([
        "Module level, as the claim states: " + c(MW, RIG + "src/effect-intent.ts", "export function readEffectIntent(path: string): EffectIntentRecord {") + "; " + c(MW, RIG + "src/effect-intent.ts", "export function fileEffectIntentStore(path: string): EffectIntentStore {") + "; " + c(MW, RIG + "src/effect-reconciliation.ts", "export async function reconcileUncertainEffect(record: ReconcileRecord, sources: ReconcileSources): Promise<Reconciliation> {"),
        "Pi tools exist: " + c(PI, "src/workbench/reconcile-tool.ts", 'name: "workflow_reconcile",') + "; " + c(PI, "src/workbench/control-tool.ts", 'name: "workflow_control",'),
        "Package level: the rig's exports map has two entries, ./host and ./package.json (" + c(MW, RIG + "package.json", '"./host": {') + "; " + c(MW, RIG + "package.json", '"./package.json": "./package.json"') + "), and host.ts re-exports only the binding guards (" + c(MW, RIG + "src/host.ts", 'export { HostBindingError, WRITE_GRANT, admitHostBinding, dispatchWriteAtFinalBoundary, validateHostBinding } from "./host-binding.js";') + ")",
        "Mechanical's own state document confirms deep imports are closed: " + c(MW, "docs/10-current-state-and-gaps.md", "every other rig module, including `dist/cli.js` deep imports, stays closed (`ERR_PACKAGE_PATH_NOT_EXPORTED`; the `bin` entry is unaffected)."),
        "Pi's import rule: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Pi does not import Mechanical private src files, or reimplement developer logic."),
    ]),
    "Read of the rig package.json exports map (two keys) and of every export statement in src/host.ts at 69cb016d. Power: complete for what a consumer can import from the packed rig by package specifier; a deep import by file path would bypass the map and is what the Pi rule forbids.",
    "ESTABLISHED",
    NODRIFT,
    "The claim as written is true at module level: the store, the reader and the reconciliation decision are exported from their source modules. NARROWER PROPOSITION, REFUTED at 69cb016d: that Pi can import a Mechanical effect-intent lookup today. Through the only subpath the package exposes, and the only one Pi permits itself, none of these functions is reachable. P07's 'integrate Mechanical effect-intent lookup' therefore depends on Mechanical adding read-only reconcile exports (mw-03 H07: 'expose read-only resume/reconcile'), a dependency the Pi graph does not draw. Remediation ADD_MISSING_PREMISE on P07.",
)

# ---------------------------------------------------------------------------------------------
# D. Evidence tiers, test identifiers and paired falsifier outcomes
# ---------------------------------------------------------------------------------------------
NOTE_QUOTES = [
    d("mw-03-IMPLEMENTATION-PACKETS.md", "expose read-only resume/reconcile"),
    d("pi-02-PROTOCOL-AND-RUNTIME.md", "All entries are checked before invoking Mechanical."),
    d("pi-02-PROTOCOL-AND-RUNTIME.md", "After possible side effects: publish uncertain with native ids and frozen lease."),
    d("mw-04-VERIFICATION-AND-RELEASE.md", "| Q20 | first writer never dispatched, all host checks deny | zero effects and safe lease release |"),
    d("mw-04-VERIFICATION-AND-RELEASE.md", "Document untested process/host topologies."),
    d("mw-03-IMPLEMENTATION-PACKETS.md", "two hosts recovering one intent"),
    d("mw-03-IMPLEMENTATION-PACKETS.md", "detached fleet hosting"),
    d("pi-02-PROTOCOL-AND-RUNTIME.md", "effect budget and durable lease token."),
    d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "active lease/fencing token"),
    d("pi-02-PROTOCOL-AND-RUNTIME.md", "remain descriptor-only or legacy-weak"),
    d("mw-01-AUDIT-AND-PROOF.md", "descriptor-only/low-trust"),
    d("mw-03-IMPLEMENTATION-PACKETS.md", "deliberately diverging Pi/Mechanical vectors"),
    d("pi-README.md", "attached or explicitly admitted same-machine execution"),
    d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "only then enters pinned develop()"),
    c(MW, M05, "no Pi P-descriptor/P-contract coordination was performed"),
]


def _tokens(side, pattern):
    out = {}
    for path in sorted(glob.glob(DOCS + side + "-*.md")):
        with open(path, encoding="utf-8") as handle:
            for match in _re.finditer(pattern, handle.read()):
                out[match.group(0)] = out.get(match.group(0), 0) + 1
    return out


_pi_L = _tokens("pi", r"\bL[0-6]\b")
_mw_V = _tokens("mw", r"\bV[0-6]\b")
assert _pi_L == {"L2": 2, "L3": 1, "L4": 1, "L5": 1}, _pi_L
assert _mw_V == {"V1": 1}, _mw_V
assert _tokens("pi", r"\bQ(0[1-9]|1[0-9]|2[0-4])\b") == {}
assert _tokens("mw", r"\bG(0[1-9]|1[0-2])\b") == {} and _tokens("mw", r"\bP1[3-8]\b") == {}
assert len(_tokens("mw", r"\bQ(0[1-9]|1[0-9]|2[0-4])\b")) == 24
expect_doc_count("mw", "MW-CONTRACT", 0)
expect_doc_count("pi", "MW-CONTRACT", 2)
BEADPLAN = "docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/BEAD-PLAN.md"

row(
    ["C005"],
    "CONTRADICTS",
    J([
        d("pi-README.md", "This is the next, self-contained design revision."),
        "Mechanical's ladder used without definition: " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "- Registration test bypasses Pi tool, or native test uses fake SDK/Forge; missing L4/L5 but marked shipped.") + "; " + d("pi-01-AUDIT-AND-INVARIANTS.md", "**I10 Historical correctness:** Existing direct Mechanical L2, older native L3 and Pi script tests remain separate; only an actual registered Pi invocation proves V3/V4.") + "; the definitions are in the companion: " + d("mw-04-VERIFICATION-AND-RELEASE.md", "L0 source at exact SHAs; L1 deterministic direct function/certification/recovery tests plus negative mutants;"),
        "Eight D-numbers carried as labels only: " + d("pi-README.md", "D8/D10/D11/D12 are shared or Mechanical-owned as described in this corpus."),
        "A gate name defined in neither corpus: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "ONLY after MW-CONTRACT ratification and exact installed host tests.") + "; its only definitions are Pi code and a November 4 triage plan: " + c(PI, "src/workbench/function-authority.ts", 'export const FUNCTION_ACTION_BLOCKER = "MW-CONTRACT";') + "; " + c(PI, BEADPLAN, "- External producer dependencies: MW-CONTRACT (MW/HX-owned; see MW-owned tracks).", 1),
        "A dependency named by description only: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "### P08 — Genuine native acceptance (P0; P05–P07 and Mechanical host native closure)"),
    ]),
    "Token census over the six Pi files (asserted by this generator): L-tier tokens L2 x2, L3 x1, L4 x1, L5 x1 and no sentence defining any L-tier; D1, D2, D4, D7, D8, D10, D11, D12 only at README line 27; 'MW-CONTRACT' twice (01 and 02) and never defined. Over the six Mechanical files: 'MW-CONTRACT' 0 times. Power: complete for these literal tokens; a term defined under another spelling would be missed, and none was found on reading all six Pi files end to end.",
    "REFUTED",
    NODRIFT,
    "Facet (i) of C005, that this is the next design revision after November 9, is untouched. Facet (ii), self-containment, is refuted: to act on the Pi program a reader must fetch (a) the companion's ledger for the meaning of D1, D2, D4, D7, D8, D10, D11 and D12, (b) the companion's ladder for L2 to L5, two of which (L4 and L5) Pi uses inside a release veto, (c) the November 4 triage or Pi source for what MW-CONTRACT is, and (d) the companion's packets to learn what 'Mechanical host native closure' and the H-labels cover. The narrower statement the evidence supports is 'self-contained for Pi-owned work, with Mechanical items referenced by label'. Remediation NARROW_SCOPE on 'self-contained' or ADD_SOURCE for each borrowed term.",
)

row(
    ["C067", "C183", "C184", "C185", "C186", "C210", "C211"],
    "CONFLICTS_WITH",
    J([
        "Pi ladder: " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "V2: actual independent npm-packed Mechanical host installed in fresh consumer; digest+runtime-file checks; no Pi claimed.") + "; " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "V3: actual registered workflow_execute(function) with deterministic four callbacks and workflow_observe, no native provider claim.") + "; " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "V4: same registered route and installed real Claude SDK + native Forge full gate, committed Git candidate tree and manifest proof; no fake green."),
        "Mechanical ladder: " + d("mw-04-VERIFICATION-AND-RELEASE.md", "L3 live Claude/Git/Forge proof from standalone producer; L4 SAME native journey actually invoked via Pi registered workflow_execute(kind=function), with workflow_observe;") + "; " + d("mw-04-VERIFICATION-AND-RELEASE.md", "L2 fixture named pi-consumer is not L4. An older L3 receipt does not certify current native runtime."),
        "Mechanical folds Pi's V3 into its L4 packet: " + d("mw-03-IMPLEMENTATION-PACKETS.md", "Test four domain outcomes with deterministic services separately, and verified_case with native provider only."),
        "Both receipts carry a tier field with different vocabularies: " + d("mw-04-VERIFICATION-AND-RELEASE.md", '"tier":"L0|L1|L2|L3|L4|L5|L6",') + " against " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "packages:[{name,sha256,runtimeManifestSha256}], tier, gates:[{command,exitCode,forgeOperationId}]") + "; committed Mechanical receipts already use the L form (" + c(MW, M05, '"evidence_tier": "L2",') + ")",
        "Pi states Mechanical deliverables in Pi tiers and a Pi veto in Mechanical tiers: " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "H05: shared tests, installed host V2, registered Pi tool V3, native V4, recovery V5; exact owner and operation receipt.") + "; " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "- Registration test bypasses Pi tool, or native test uses fake SDK/Forge; missing L4/L5 but marked shipped."),
        "'V1' in the Mechanical corpus is a contract version, not a tier: " + d("mw-01-AUDIT-AND-PROOF.md", "STRICT V1 promotion requires gate_passed===true"),
    ]),
    "Regex \\bV[0-6]\\b over the six Mechanical files: one hit, the 'STRICT V1' of mw-01. Regex \\bL[0-6]\\b over the six Pi files: five hits (L2 twice, L3, L4, L5), none a definition. Both asserted by this generator.",
    "NON-EPISTEMIC",
    NODRIFT,
    "The tiers are stipulations, so nothing here is true or false; the defect is that the two ladders share numbers but not meanings at index 3. By content V0=L0, V1=L1, V2=L2, V4=L4, V5=L5 and V6 is close to L6 (L6 names HX/RF/Furnace, V6 adds detached and fleet). V3 is a registered Pi run with deterministic callbacks and no native provider; L3 is a native run with no Pi. Neither program has a name for the other's tier 3, and a receipt for Pi's V3 cannot be labeled on the Mechanical scale: it is above L2 and is neither L3 nor L4. A bead or receipt that says 'tier 3' is ambiguous between two different proofs. The Pi veto 'missing L4/L5' works only because 4 and 5 happen to coincide. Remediation: one joint ladder, or prefixed tiers with a stated mapping and an explicit slot for registered-deterministic and for standalone-native.",
)

row(
    ["C176", "C135"],
    "CONFLICTS_WITH",
    J([
        "Shared tests are promised: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Both test the same versioned fixture vectors.") + "; " + d("mw-03-IMPLEMENTATION-PACKETS.md", "**Done:** jointly agreed contract fixtures; no feature marked joined yet."),
        "Pi identifiers: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Change:** tests for G01–G12 and Pi-specific P-cases, process-kill harness, soak instrumentation.") + "; " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "| P13 | principal or grant revoked during install | final-boundary refusal, zero writer calls |"),
        "Mechanical identifiers: " + d("mw-03-IMPLEMENTATION-PACKETS.md", "**Work:** test Q01–Q18 in 04-VERIFICATION-AND-RELEASE.md with paired positive/negative and mutants.") + " while the table runs to " + d("mw-04-VERIFICATION-AND-RELEASE.md", "| Q24 | four domain results and four named callbacks | exact outcome preservation; no double invocation |"),
        "The P-prefix is also Pi's packet prefix: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "### P12 — Optional HX/RF and additional pure function families (P2)"),
    ]),
    "Regex census asserted by this generator: no Q-identifier occurs in the six Pi files; no G01..G12 and no P13..P18 occurs in the six Mechanical files; the Mechanical files define 24 distinct Q-identifiers.",
    "NON-EPISTEMIC",
    NODRIFT,
    "Two disjoint test namespaces cover largely the same faults with no cross-reference, so 'the same versioned fixture vectors' has no shared identifier to hang on. Content mapping: G01~Q01; G02~Q03; G03~Q04+Q05; G04~Q11; G05~Q12; G06 and G07~Q18; G09~Q16; G11~Q19; G12~Q08; P13 and P14~Q17. Pi-only: G08 (Beads notes), G10 (forged request fields; Mechanical lists 'model-forged grant' as an H06 falsifier without a Q id), P15, P16, P17, P18. Mechanical-only: Q02, Q06, Q07, Q09, Q10, Q13, Q14, Q15, Q20 to Q24. Two further defects: mw-03 H09 schedules Q01 to Q18 although mw-04 defines Q01 to Q24, leaving Q19 to Q24 without a packet; and Pi's test ids P13 to P18 continue the packet series P00 to P12, so 'P13' reads as a packet to anyone coming from mw-05's 'Pi P05' style references. Remediation: a joint fixture table keyed by one identifier per vector, with owner and both programs' local ids.",
)

row(
    ["C198"],
    "CONFLICTS_WITH",
    J([
        d("pi-04-ADVERSARIAL-VERIFICATION.md", "| G12 | HEAD/source tree changes after native PASS | record historical proof but no current-source promotion |"),
        "against " + d("mw-04-VERIFICATION-AND-RELEASE.md", "| Q08 | PASS from other commit/tree or changed clean HEAD after gate | indeterminate |") + " and " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "status/disposition consistency, no post-gate source mutation."),
        "Related rows: " + d("mw-04-VERIFICATION-AND-RELEASE.md", "| Q10 | strong matching evidence but the workspace was dirtied by gate | indeterminate; preserve native ref |") + "; vetoes " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "- Missing Forge proof becomes verified_candidate, or recorded historical pass is miscredited to a changed tree.") + " and " + d("mw-04-VERIFICATION-AND-RELEASE.md", "- Kill/restart can produce a second writer in supported topology; source tree changes while an old gate is credited."),
        "Pi's definition of the outcome at stake: " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "Verified_candidate: passed producer gate on matching candidate commit/tree with valid native gate-definition and required execution evidence."),
    ]),
    "",
    "NON-EPISTEMIC",
    NODRIFT,
    "Both rows are requirements, and for one timing they require different results. If HEAD moves cleanly after the gate has passed but before the verify callback returns, Mechanical's strict rule withholds the pass (the domain result is indeterminate and no strict certificate exists), while Pi's row asks for the pass to be recorded as historical proof and merely not credited to the current source. Pi cannot record a strict proof that Mechanical declined to issue, so under that timing G12 is satisfiable only as 'weak observation retained'. If the change happens after the invocation has settled, the two agree: the certificate stands for the old tree and Pi's freshness axis reads stale. Neither row says which timing it means. Needs a joint ruling on the window; remediation ADD_TEMPORAL_QUALIFIER on both rows.",
)

# ---------------------------------------------------------------------------------------------
# E. The ratification gate and what each side says must be ratified
# ---------------------------------------------------------------------------------------------
MW_ALL = ["apps", "packages", "contracts", "docs", "scripts", "qa", "skills", ".agents", "README.md", "AGENTS.md"]
_no_mw_contract = expect_zero(MW, MW_ALL, ["MW-CONTRACT", "MW-INSTALLED-CONSUMER", "MW-PACKAGE"])
_no_pi_installed_host = expect_zero(PI, ["src", "test", "docs/programs", ".agents"], ["MW-INSTALLED-HOST"])

row(
    ["C050", "C107"],
    "SUPPORTS",
    J([
        c(PI, "src/workbench/function-authority.ts", 'export const FUNCTION_ACTION_BLOCKER = "MW-CONTRACT";'),
        c(PI, "src/workbench/function-authority.ts", 'export const FUNCTION_ACTION_CONTRACT: FunctionActionContract = Object.freeze({ state: "unadopted", blockedOn: FUNCTION_ACTION_BLOCKER });'),
        c(PI, "src/workbench/function-authority.ts", "No action spelling is adopted: FUNCTION_ACTION_CONTRACT is unadopted, so every function dispatch"),
        "The producer agrees the spelling is not adopted: " + c(MW, RIG + "src/host-binding.ts", "/** Candidate grant spelling, not yet adopted jointly with Pi: exactly two colon-free segments. */"),
        "The blocker's name is Pi-only: " + _no_mw_contract,
    ]),
    "Text search of the Mechanical worktree at 69cb016d (apps, packages, contracts, docs, scripts, qa, skills, .agents and the two root documents; .ts, .js, .json and .md files) for the three gate names Pi's code uses, MW-CONTRACT, MW-INSTALLED-CONSUMER and MW-PACKAGE: 0 files. `git grep -c MW-CONTRACT` at MW 69cb016d and at the design commit 6476372f prints nothing. Power: complete for the literal names in tracked text; a differently named equivalent is not excluded, and the closest one is mw-03 H00.",
    "ESTABLISHED",
    NODRIFT,
    "Both observations hold at the pin on the Pi side, and the Mechanical source independently says the grant spelling is a candidate awaiting joint adoption. What the joint lens adds: 'MW-CONTRACT' is a label Pi's November 4 triage plan uses for a Mechanical-owned track; the Mechanical tree at 69cb016d and at the design commit does not contain it in code, documents or receipts. Pi's blocker therefore points at a name the other side has no artifact to cite when it closes the work.",
)

row(
    ["C105", "C051"],
    "DEPENDS_ON",
    J([
        "Pi's gate: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", 'A2 admit function action grant via adoptFunctionActions([{definitionId:"mechanical.development.develop.v1",actionGrant:"mechanical:develop-write"}]) ONLY after MW-CONTRACT ratification and exact installed host tests.') + "; " + d("pi-01-AUDIT-AND-INVARIANTS.md", "Candidate mechanical:develop-write requires joint explicit acceptance."),
        "Mechanical's gate runs the other way: " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "**Design contract — proposed, not shipped.** Its adoption requires Pi's matching v1 tests."),
        "The nearest Mechanical counterpart is unnamed: " + d("mw-03-IMPLEMENTATION-PACKETS.md", "**Work:** pin exact source SHAs, inspect current branch and Beads, record established L2 host API (not missing); ratify mechanical.pi-host/v1, reviewed ID, mechanical:develop-write, canonical input, profile pair and authorized effect vocabulary; document older client compatibility."),
        "Pinned Mechanical code describes the same contract as both proposed and ratified: " + c(MW, RIG + "src/host-binding.ts", " * Proposed application-host binding contract `mechanical.pi-host/v1` (EAT-R002) and the") + "; " + c(MW, RIG + "src/host-binding.ts", " * and the status stays descriptor-only until an invocable package has separately passed joint ratification with Pi.") + "; " + c(MW, RIG + "src/host.ts", "/** The ratified host contract version this facade implements (mechanical.pi-host/v1). */"),
        "Pi's code names two more external gates that neither new program mentions: " + c(PI, "src/workbench/mechanical-descriptor.ts", " * NOT CLAIMED (explicitly partial; closure gate MW-INSTALLED-CONSUMER, external MW-CONTRACT and MW-PACKAGE): where the pin"),
        "Receipt names do not cross either: " + _no_pi_installed_host + " (MW-INSTALLED-HOST is the label of Mechanical's committed L2 receipt)",
    ]),
    "Same search as the previous row for MW-CONTRACT, MW-INSTALLED-CONSUMER and MW-PACKAGE in the Mechanical worktree (0 files) and in the six mw-*.md files (0 occurrences of MW-CONTRACT, asserted). Search of Pi src, test, docs/programs and .agents for MW-INSTALLED-HOST: 0 files. Power: complete for literal names.",
    "UNSUPPORTED",
    NODRIFT,
    "PREMISE GRADED: that 'MW-CONTRACT ratification' is a defined event that Mechanical can perform and Pi can check. Nothing supports it. The name exists only on the Pi side; the companion never defines a ratification receipt, a ratified-contract marker or a place where ratification is recorded; its own source calls the same contract 'proposed' in one module and 'ratified' in another. The two adoption sentences also wait on each other: Pi adopts the grant only after Mechanical ratifies and installed-host tests exist, Mechanical adopts its contract only after Pi's matching v1 tests exist. That is workable if both mean the joint P00/H00 step, but neither says so and neither names the artifact that would end the wait. The adoption rule itself is a proposal and stays NON-EPISTEMIC. Remediation ADD_MISSING_PREMISE: define the ratification artifact once (name, location, both SHAs, the fixture vectors it covers) and have both programs cite it; retire or map MW-INSTALLED-CONSUMER and MW-PACKAGE.",
)

expect_doc_count("pi", "allowedEffects", 0)
assert doc_count("mw", "allowedEffects") == 5
expect_doc_count("mw", "compatibility matrix", 0)
expect_doc_count("mw", "hostMode", 0)
expect_doc_count("mw", "host mode", 0)

row(
    ["C146", "C148"],
    "CONFLICTS_WITH",
    J([
        "Pi's list: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Implement:** signed-off literal descriptor ID/version, exact action grant mechanical:develop-write, canonical input rule, first host mode, profile set, versioned test vectors; record both source SHAs, installed Node/SDK identity.") + " with exit " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Done:** two repos reference identical compatibility matrix; unknown versions fail closed."),
        "Mechanical's list: " + d("mw-03-IMPLEMENTATION-PACKETS.md", "ratify mechanical.pi-host/v1, reviewed ID, mechanical:develop-write, canonical input, profile pair and authorized effect vocabulary; document older client compatibility.") + " with exit " + d("mw-03-IMPLEMENTATION-PACKETS.md", "**Done:** jointly agreed contract fixtures; no feature marked joined yet."),
        "Mechanical expects Pi to ratify effect strings: " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "Exact spelling must be ratified with Pi and schema, never free-text privilege expansion.") + "; today they are any non-empty strings: " + c(MW, RIG + "src/host-binding.ts", 'if (!Array.isArray(effects) || effects.some(effect => typeof effect !== "string" || effect.length === 0)) throw new HostBindingError("HOST_BINDING_FIELD_INVALID", "intent.allowedEffects");'),
        "Pi's longer handshake list still omits them: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "ABI handshake: descriptor id/schema, host version, export names, write grant grammar, input/output closed JSON, progress/event vocabulary, result semantics, native refs, evidence profile, runtime manifest, disposition, cancellation, retry law."),
        "Mechanical's handoff record asks for items Pi's lists lack: " + d("mw-05-OPERATIONS-AND-HANDOFF.md", "Packet id + owner, exact Mechanical and Pi commits, installed artifact bytes/digests, contract version and supported profiles, reviewed descriptor, method/export name, allowed effect strings, callable sample and expected error shape, tests with negative mutants, native operation refs if tested, unresolved questions, and evidence tier."),
    ]),
    "Token counts over the two corpora, asserted by this generator: 'allowedEffects' 0 in the Pi files and 5 in the Mechanical files; 'compatibility matrix' 1 in Pi and 0 in Mechanical; 'hostMode' and 'host mode' 0 in Mechanical.",
    "NON-EPISTEMIC",
    NODRIFT,
    "Both first packets are proposals; the defect is that they would ratify different things and declare themselves done against different artifacts. Only Pi lists a first host mode and the installed Node/SDK identity. Only Mechanical lists the authorized effect vocabulary (the closed set behind intent.allowedEffects, which Pi never mentions and whose nearest Pi term, 'effect budget', is undefined), the binding contract version by name and older-client compatibility. Pi's exit is an 'identical compatibility matrix' referenced by both repositories; Mechanical's is 'jointly agreed contract fixtures'. Neither program says which repository holds the matrix or the vectors, what they are called, or how each side detects that its copy has drifted. Error codes are requested by Mechanical's handoff record ('expected error shape') and absent from Pi's handshake list. Remediation: one joint ratification checklist that is the union of the two lists, and a named home for the shared vectors.",
)

# ---------------------------------------------------------------------------------------------
# F. Shared vocabularies: assurance, effect disposition, errors, receipts
# ---------------------------------------------------------------------------------------------
NOV9_03 = "docs/programs/pi-native-interoperability-2026-11-09/03-VERIFICATION-AND-RELEASE.md"
_no_assurance_code = expect_zero(MW, [RIG + "src", RIG + "test", "packages"], ["VerificationCertificate", "forge-certificate", "strict-native", "legacy-observed", "legacy-weak", "candidate-bound-native"])
expect_doc_count("pi", "ertificate", 0)

row(
    ["C171"],
    "CONTRADICTS",
    J([
        "Pi packet: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Implement:** native refs + Pi invocation correlation; typed stages and raw Mechanical four domain results; strict/weak/unknown gate assurance; bounds/drop/freshness semantics. No results invented when provider missing."),
        "Mechanical code at the pin has no assurance level and no certificate: " + _no_assurance_code + "; what exists is a three-axis binding record: " + c(MW, RIG + "src/live-gate.ts", 'export type BindingSource = "native" | "run_record" | "descriptor";') + "; " + c(MW, RIG + "src/live-gate.ts", 'readonly gateDefinition: "native" | "descriptor";') + "; " + c(MW, RIG + "src/live-gate.ts", 'readonly environment: "established" | "descriptor";'),
        "The strict/legacy distinction exists only as companion design, with other spellings and four levels: " + d("mw-01-AUDIT-AND-PROOF.md", "3. **Native assurance:** descriptor / legacy-observed / candidate-bound-native / strict-native; never silently promote a legacy record.") + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "## 4. VerificationCertificate (new app-level type; not Mechanical core)"),
    ]),
    "Text search of MW apps/development-rig/src, apps/development-rig/test and packages/ at 69cb016d for VerificationCertificate, forge-certificate, strict-native, legacy-observed, legacy-weak and candidate-bound-native: 0 files (asserted). A word search for 'assurance' in the same trees also returns nothing. Power: complete for these spellings in pinned source and tests; the three-axis GateBinding record is the only assurance-like structure found on reading live-gate.ts and host-services.ts.",
    "REFUTED",
    NODRIFT,
    "PREMISE GRADED: the embedded premise recorded for C171, that Pi's strict/weak assurance corresponds to a strict-versus-legacy-weak certificate distinction existing in Mechanical at 69cb016d. No such distinction exists in the pinned code: there is no certificate type and no assurance level, only per-axis binding sources (commit: native, run_record or descriptor; gate definition: native or descriptor; environment: established or descriptor), and that record has no tree axis. The distinction Pi relies on is future work in the companion (mw-03 H01), where it has four levels and the weak level is spelled legacy-observed. The P06 deliverable itself is a proposal and stays NON-EPISTEMIC. Consequence: P06's assurance axis cannot be built against today's producer and depends on Mechanical H01. Remediation ADD_TEMPORAL_QUALIFIER: say that the strict/weak distinction is a Mechanical H01 deliverable, not a property of the producer at 69cb016d, and use one spelling for the weak level.",
)

row(
    ["C125"],
    "CONFLICTS_WITH",
    J([
        "Pi: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Add observed assurance: strict-native, legacy-weak, unknown; effect: no-effect, dispatched-uncertain, occurred, settled.") + "; " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Old v1 descriptors without mandatory new assurances remain descriptor-only or legacy-weak; never silently promote.") + "; " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "legacy-weak PASS never promoted."),
        "Mechanical: " + d("mw-01-AUDIT-AND-PROOF.md", "3. **Native assurance:** descriptor / legacy-observed / candidate-bound-native / strict-native; never silently promote a legacy record.") + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", 'assurance: "strict-native";') + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "Legacy weak PASS remains a producer observation with assurance legacy-observed; the function domain projection becomes indeterminate under strict profile."),
        "How the weak case meets the domain result: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Domain result remains one of verified_candidate / verification_failed / needs_evidence / indeterminate, unmodified.") + "; " + d("pi-01-AUDIT-AND-INVARIANTS.md", "Pi must preserve the weak observation without upgrading it to strict verified status."),
    ]),
    "Token counts over the two corpora: 'legacy-weak' occurs in Pi files only, 'legacy-observed' and 'candidate-bound-native' in Mechanical files only; 'strict-native' is the single shared value.",
    "NON-EPISTEMIC",
    NODRIFT,
    "Two proposed enumerations for one axis that both programs put on the shared ABI list. Pi has three values (strict-native, legacy-weak, unknown); Mechanical has four (descriptor, legacy-observed, candidate-bound-native, strict-native). One value is shared. Pi's 'unknown' has no Mechanical counterpart; Mechanical's 'descriptor' and 'candidate-bound-native' have no Pi value, so a producer record at 'candidate-bound-native' (commit proven natively, tree or environment not) has no defined projection. The weak level is spelled two ways. The programs also describe the weak case differently: Mechanical turns a legacy PASS into the domain result indeterminate under the strict profile, so the pair {verified_candidate, legacy-weak} cannot be produced; Pi's wording keeps the domain result 'unmodified' and separately promises not to upgrade a weak observation, which reads as if that pair could arrive. Needs one ratified enumeration and a statement of which (domain, assurance) pairs are possible.",
)

row(
    ["C125", "C127", "C211"],
    "CONFLICTS_WITH",
    J([
        "Pi: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Add observed assurance: strict-native, legacy-weak, unknown; effect: no-effect, dispatched-uncertain, occurred, settled.") + "; lease states " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "state: reserved -> active -> uncertain/recovering -> settled/released.") + "; receipt " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "effects:{intentId,leaseGeneration,disposition,reconciliation}"),
        "Mechanical design, three spellings: " + d("mw-01-AUDIT-AND-PROOF.md", "4. **Effects:** no-dispatch, dispatched-uncertain, occurred, settled; don't assume failed or passed means rolled back.") + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "Model states: intended -> dispatch-possible -> observed-native-effects -> settled / uncertain. Never infer no-dispatch after an API call that might have been received.") + "; " + d("mw-04-VERIFICATION-AND-RELEASE.md", '"effects": { "intentId":null, "fencingGeneration":null, "disposition":"unknown" },') + "; " + d("mw-05-OPERATIONS-AND-HANDOFF.md", 'An operator should see "unknown after dispatch" separately from "verified failed" and "no effect dispatched".'),
        "Mechanical code and committed receipts, four more: " + c(MW, RIG + "src/effect-intent.ts", 'export type EffectDisposition = "uncertain" | "settled";') + "; " + c(MW, RIG + "src/progress-stages.ts", 'export type ProgressDisposition = "none" | "uncertain" | "settled";') + "; " + c(MW, RIG + "src/effect-reconciliation.ts", 'readonly disposition: "occurred" | "not-occurred" | "unknown";') + "; " + c(MW, NOV9_03, "effect_disposition: not-started|started|settled|uncertain") + " as used in " + c(MW, M01, '"effect_disposition": "not-started",'),
    ]),
    "",
    "NON-EPISTEMIC",
    NODRIFT,
    "The effect axis is on both programs' ratification lists ('disposition') and has no agreed value set. Pi and mw-01 differ in the first value, and the difference is semantic: Pi's 'no-effect' asserts that nothing happened, which is the negative both programs say needs a producer certificate (D2); Mechanical's 'no-dispatch' asserts only that the writer was never called, which a pre-dispatch refusal can prove. Projecting no-dispatch to no-effect is sound; assigning no-effect after a dispatch is the inference D2 forbids, and the Pi vocabulary does not prevent it. Inside the Mechanical program the same axis is written four ways in the design files and four ways in code and committed receipts (uncertain/settled; none/uncertain/settled; occurred/not-occurred/unknown; not-started/started/settled/uncertain), and the new release receipt's template value 'unknown' belongs to the reconciliation vocabulary, not to any effect vocabulary. Pi's receipt separates disposition from reconciliation; Mechanical's has one field. Needs one enumeration with a mapping from the existing code values.",
)

_new_codes = ["HOST_BINDING_INVALID", "HOST_SOURCE_CHANGED", "HOST_WRITE_GRANT_REVOKED", "HOST_LEASE_STALE", "HOST_RUNTIME_CONTENT_MISMATCH",
              "HOST_PROVIDER_UNAVAILABLE", "HOST_INTENT_NOT_DURABLE", "HOST_NATIVE_PROOF_INCOMPLETE", "HOST_EFFECT_UNKNOWN",
              "NATIVE_EVIDENCE_MISSING", "UNCERTAIN_EFFECT"]
_no_codes_mw = expect_zero(MW, [RIG + "src", RIG + "test", "packages"], _new_codes, word=True)
_no_codes_pi = expect_zero(PI, ["src"], _new_codes + ["SOURCE_CHANGED", "GRANT_REVOKED", "WRITER_HELD"], word=True)
assert files_naming(PI, ["src"], "UNCERTAIN_EFFECT") == ["src/workflow/journal-compat.ts"]

row(
    ["C130", "C224"],
    "CONFLICTS_WITH",
    J([
        "Pi protocol, 17 kebab-case categories: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Reject with stable categories: definition-unreviewed; descriptor-mismatch; artifact-mismatch; installed-content-mismatch; runtime-unavailable; permission-unknown; grant-revoked; principal-changed; source-changed; workspace-dirty; writer-held; capacity-exhausted; intent-persist-failed; dispatch-outcome-unknown; post-dispatch-aborted; native-gate-unestablished; recovery-not-authorized."),
        "Pi operations, five upper-case reasons: " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "Provide reason-specific action help for SOURCE_CHANGED, GRANT_REVOKED, WRITER_HELD, NATIVE_EVIDENCE_MISSING and UNCERTAIN_EFFECT."),
        "Mechanical, nine HOST_ codes: " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "Stable typed errors: HOST_BINDING_INVALID, HOST_SOURCE_CHANGED, HOST_WRITE_GRANT_REVOKED, HOST_LEASE_STALE, HOST_RUNTIME_CONTENT_MISMATCH, HOST_PROVIDER_UNAVAILABLE, HOST_INTENT_NOT_DURABLE, HOST_NATIVE_PROOF_INCOMPLETE, HOST_EFFECT_UNKNOWN."),
        "Codes that exist today: " + c(MW, RIG + "src/host-binding.ts", 'export type WriteGrantCode = "WRITE_GRANT_ABSENT" | "WRITE_GRANT_NOT_EXACT" | "WRITE_GRANT_UNREPRESENTABLE" | "WRITE_GRANT_REVOKED";') + "; " + c(PI, "src/workbench/source-admission.ts", '  | "writer-held"') + "; " + c(PI, "src/workbench/source-admission.ts", '  | "dirty-base"') + "; " + c(PI, "src/workbench/function-authority.ts", '  | "changed-effective-identity"'),
        "None of the proposed names has a code witness: " + _no_codes_mw + "; " + _no_codes_pi + "; the one near miss is an unrelated script-journal constant, " + c(PI, "src/workflow/journal-compat.ts", 'export const JOURNAL_UNCERTAIN_EFFECT_WARNING = "journal uncertain effect";'),
    ]),
    "Whole-identifier search of both pinned sources for the nine proposed HOST_ codes and Pi's five upper-case reasons: 0 files on either side (asserted); as a substring UNCERTAIN_EFFECT occurs once in Pi, inside the unrelated constant JOURNAL_UNCERTAIN_EFFECT_WARNING. Of Pi's 17 kebab-case categories only source-changed and writer-held are existing SourceAdmissionCode members.",
    "NON-EPISTEMIC",
    NODRIFT,
    "Three proposed error vocabularies for one boundary, with no mapping in either corpus, and Pi's handshake list omits error codes while Mechanical's handoff record requires an 'expected error shape'. By meaning: HOST_SOURCE_CHANGED ~ source-changed ~ SOURCE_CHANGED; HOST_WRITE_GRANT_REVOKED ~ grant-revoked ~ GRANT_REVOKED; HOST_RUNTIME_CONTENT_MISMATCH ~ installed-content-mismatch; HOST_PROVIDER_UNAVAILABLE ~ runtime-unavailable; HOST_INTENT_NOT_DURABLE ~ intent-persist-failed; HOST_NATIVE_PROOF_INCOMPLETE ~ native-gate-unestablished ~ NATIVE_EVIDENCE_MISSING; HOST_EFFECT_UNKNOWN ~ dispatch-outcome-unknown ~ UNCERTAIN_EFFECT. Holes: Mechanical's HOST_LEASE_STALE has no Pi category (writer-held is a pre-dispatch conflict, not a stale fence), although Pi asks the provider to reject a stale fence; Pi's principal-changed has no Mechanical code, although Mechanical's H2 checks principal stability; HOST_BINDING_INVALID has no Pi category. Pi's operations file respells two of its own protocol categories. Whether a Mechanical admission error returned after Pi's handoff counts as a pre-effect refusal (lease released) or as a post-dispatch unknown (lease frozen) depends on this mapping and is not stated. Remediation: one joint error table with the pre-effect/post-effect class of every code.",
)

_no_pi_receipt_schema = expect_zero(PI, ["src", "test", "docs", "qa", ".agents"], ["interop-receipt"])

row(
    ["C211", "C180"],
    "CONFLICTS_WITH",
    J([
        "Pi release receipt, no schema id: " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "JSON fields: {schema, generatedAt, pi:{branch,sha,dirty},mechanical:{branch,sha,dirty}, nodeVersion, sdkIdentities, packages:[{name,sha256,runtimeManifestSha256}], tier, gates:[{command,exitCode,forgeOperationId}], fixtures:[{id,positive,mutant,observed}], native:{invocationId,claudeSessionId,baseCommit,baseTree,candidateCommit,candidateTree,forgeOperationId,gateDefinitionSha256,environmentBinding}, effects:{intentId,leaseGeneration,disposition,reconciliation}, residualUnknowns, docsAndSkillRefs}."),
        "Mechanical release receipt: " + d("mw-04-VERIFICATION-AND-RELEASE.md", '"schema": "mechanical.pi-host.release/v1",') + "; " + d("mw-04-VERIFICATION-AND-RELEASE.md", '"repository": { "branch":"main", "commit":"<actual>", "dirty":false },') + "; " + d("mw-04-VERIFICATION-AND-RELEASE.md", '"pi": { "branch":"master", "commit":"<actual>" },') + "; " + d("mw-04-VERIFICATION-AND-RELEASE.md", '"packages": [{ "name":"<actual>", "sha256":"<actual>", "installedContentSha256":"<actual>" }],') + "; " + d("mw-04-VERIFICATION-AND-RELEASE.md", '"claudeSdkIdentity":null,') + "; " + d("mw-04-VERIFICATION-AND-RELEASE.md", '"tests": [{ "id":"Q01", "command":"<actual>", "exitCode":null, "observed":"<actual>" }],') + "; " + d("mw-04-VERIFICATION-AND-RELEASE.md", '"native": { "piInvocationId":null, "claudeSessionId":null, "candidateCommit":null, "candidateTree":null, "forgeOperationId":null, "gateDefinitionSha256":null, "environmentPin":null },') + "; " + d("mw-04-VERIFICATION-AND-RELEASE.md", '"effects": { "intentId":null, "fencingGeneration":null, "disposition":"unknown" },'),
        "A third shape is already committed on the Mechanical side: " + c(MW, M01, '"schema": "mw.pi-interop-receipt.v1",') + "; " + c(MW, M01, '"pi_invocation_id": null,') + "; " + c(MW, M01, '"pi_definition_digest": null,'),
        "One joint run, two receipts: " + d("mw-03-IMPLEMENTATION-PACKETS.md", "**Done:** truthful L4 source-pinned receipt from both repositories; no public availability claim without it.") + "; " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Done:** independently inspectable V4 receipt with exact SHAs and commands; no simulated PASS accepted.") + "; " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "Persist logs under a new source-pinned QA receipt directory, not by rewriting older provenance."),
        "Pi has no copy of the committed schema: " + _no_pi_receipt_schema,
    ]),
    "",
    "NON-EPISTEMIC",
    NODRIFT,
    "Both receipt formats are templates. The same facts carry different names, so the two receipts of one joint run cannot be joined by field: repository blocks (Pi 'sha', Mechanical 'commit'; Mechanical's Pi block has no 'dirty'); SDK identity (one 'sdkIdentities' against 'claudeSdkIdentity' and 'forgeSdkIdentity'); package integrity ('runtimeManifestSha256' against 'installedContentSha256'); test records (gates plus fixtures against one tests list); the invocation ('invocationId' against 'piInvocationId'); the environment ('environmentBinding' against 'environmentPin'); the fence ('leaseGeneration' against 'fencingGeneration'). Only Pi records base commit and tree, a reconciliation field, a timestamp and doc references. Pi's 'schema' member has no value to put in it. Both give one 'gateDefinitionSha256', while the Mechanical certificate separates the native gate-definition hash from the admitted manifest hash. A third, snake_case schema with its own names for the same facts is what Mechanical has actually committed. Neither program names the directory the joint receipt lives in. Remediation: one joint receipt schema, or a stated field mapping and a required shared key (Pi invocation id plus both commit SHAs).",
)

# ---------------------------------------------------------------------------------------------
# G. What crosses the boundary: callbacks, artifacts, exports, provider SDKs
# ---------------------------------------------------------------------------------------------
expect_doc_count("pi", "provider factories", 0)
expect_doc_count("pi", "invokeAuthorizedDevelopmentHost", 0)
expect_doc_count("pi", "invokeDevelopmentHost", 0)
STATE10 = "docs/10-current-state-and-gaps.md"

row(
    ["C133", "C184"],
    "CONFLICTS_WITH",
    J([
        "Pi: the callbacks are handed to Mechanical: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Mechanical receives trusted host binding + constrained four service callbacks and a cancellation/progress channel."),
        "Mechanical: the host builds them itself from host-supplied factories: " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "- The proposed composed call validates both, rechecks trust-sensitive facts at final effect boundary, constructs the four services and only then enters pinned develop().") + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "H4 construct closed discover/compileContext/implement/verify callbacks bound to one request/source/fence/effect id; reject extra/missing callbacks.") + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "- Trusted host context carries current effective principal/session/grants (not caller JSON), verified source attestation, active lease/fencing token, read-only runtime artifact store, cancellation and progress sink, durable effect store, provider factories, resource budget and actual current Git/Forge measurements."),
        "Pi's own handoff list agrees with Mechanical, not with Pi section 8: " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "H02: production four callbacks composed from native Git census/plain task, Claude Agent SDK and Forge gate; provider SDK/runtime identity pinned; no nested developLive within implement callback."),
        "Mechanical's ownership statement: " + d("mw-05-OPERATIONS-AND-HANDOFF.md", "- apps/development-rig owns host facade, native Git census/plain context, Claude Agent SDK, Forge SDK, artifact verification, durable intent/reconciliation, source custody, runtime cache and actual provider operations."),
        "The shipped facade is the caller-supplies-callbacks shape: " + c(MW, RIG + "src/host.ts", "/** Exactly the four application callbacks; an extra key refuses. */") + "; " + c(MW, RIG + "src/host-services.ts", " * Pure composition: the four service closures come from the application, never from descriptor"),
        "Pi's deterministic tier needs an injection seam that neither program names: " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "V3: actual registered workflow_execute(function) with deterministic four callbacks and workflow_observe, no native provider claim."),
        "and Pi forbids itself the alternative: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Pi does not import Mechanical private src files, or reimplement developer logic."),
    ]),
    "Token counts asserted by this generator: 'provider factories' 0 in the Pi files, 1 in the Mechanical files; 'four service callbacks' occurs only in pi-02.",
    "NON-EPISTEMIC",
    NODRIFT,
    "A proposal-level disagreement about the direction of the central ABI argument. Pi section 8 describes today's facade, in which the caller passes four callbacks; if Pi passed production callbacks it would be writing discover, compileContext, implement and verify, which its next sentence forbids. Mechanical's design, and Pi's own handoff item H02, have Mechanical compose them, with Pi passing 'provider factories' inside a trusted host context that the Pi corpus never mentions. The difference decides what Pi's tier V3 injects (four deterministic callbacks, or deterministic factories) and whether Mechanical's ownership sentence ('owns ... Claude Agent SDK, Forge SDK ... actual provider operations') is compatible with factories arriving from Pi. Needs one ratified signature for the composed call: its arguments, which of them are data and which are live functions, and the test seam for deterministic services.",
)

row(
    ["C058", "C089", "C092", "C165", "C195"],
    "CONTRADICTS",
    J([
        "Singular artifact in both contracts: " + d("pi-01-AUDIT-AND-INVARIANTS.md", "**I1 Immutable bytes:** The exact reviewed definition ID, schema, descriptor digest, tarball digest, runtime file manifest digest and validated input bytes identify execution.") + "; " + d("pi-02-PROTOCOL-AND-RUNTIME.md", '**Model-facing workflow_execute:** definitionRef {kind:"function", id:"mechanical.development.develop.v1", schemaVersion:<exact reviewed version>, artifactDigest:<sha256>}') + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "- Serialized mechanical.pi-host/v1 binding carries reviewed descriptor ID, exact artifact + descriptor digests,"),
        "The one pinned artifact is the library on both sides: " + c(MW, RIG + "src/host-binding.ts", 'literal(artifact, "artifact", "package", "@mechanical/workflows-development");') + "; " + c(PI, "src/workbench/mechanical-descriptor.ts", 'package: "@mechanical/workflows-development",') + "; " + c(MW, STATE10, "`invokeDevelopmentHost` takes the committed descriptor bytes and their `sha256:` digest and the packed library tarball and its digest,") + "; " + c(MW, RIG + "src/installed-host.ts", 'const artifact = join(root,"development.tgz");'),
        "but the code Pi imports is a different package with its own dependencies: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Implement:** exact descriptor/installed package/runtime manifest checks; import @mechanical/development-rig/host only from reviewed installed artifact; reject disallowed exports and missing callback binding; don't construct a second Mechanical scheduler.") + "; " + c(MW, RIG + "package.json", '"@mechanical/workflows-coordination": "0.1.0",') + "; " + c(MW, RIG + "package.json", '"@mechanical/workflows-development": "0.1.0"'),
        "The committed L2 run installed three tarballs (" + ", ".join(TARBALLS) + ", asserted from the M05 receipt): " + c(MW, STATE10, "installs the three packed tarballs into an empty external npm project on Node 24"),
        "The library is in the closure twice: as the digest-pinned tarball the host installs per call, and as the rig's own declared dependency, which the existing services helper calls directly: " + c(MW, RIG + "src/host-services.ts", 'import { develop, type Candidate, type DevelopmentOutcome, type DevelopmentRequest, type DevelopmentServices, type VerificationResult } from "@mechanical/workflows-development";') + "; " + c(MW, RIG + "src/host-services.ts", "  return develop(createDevelopmentServices(bindings, request), request);"),
        "Each program tests 'installed JS' without saying of which package: " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "| G09 | installed JS mutation after tarball extraction | refuse before trusted import |") + "; " + d("mw-04-VERIFICATION-AND-RELEASE.md", "| Q16 | admitted tarball unchanged, installed dist/index.js or dependency mutated | refuse before module import |") + " (dist/index.js is the library's entry; the rig's is dist/host.js)",
    ]),
    "",
    "REFUTED",
    "The M05 receipt was produced at Mechanical c8be64da, an ancestor of 69cb016d; the rig manifest's dependency list and installed-host.ts are unchanged through origin/main 0ffdc844.",
    "PREMISE GRADED: that one tarball digest, the one in definitionRef.artifactDigest and in the binding's artifact member, pins the Mechanical code that executes. At the pin it pins only the library that the host installs at call time. The package Pi itself imports, the rig host that performs Mechanical's whole admission, is a second tarball with the coordination package, a third, among its dependencies, and none of the three contract surfaces (Pi's model-facing reference, Pi's reviewed allowlist entry, the v1 binding) has a slot for the rig's or the coordination package's digest. Pi's host-held plan says 'package/runtime-manifest digests' and its interface section says 'exact pinned tarballs' in the plural, so the intent may be wider than the singular wording; nothing states which side verifies which package's installed files. As written, Mechanical's H03/Q16 cover the library install and Pi's P04/G09 cover whatever Pi imports, and the rig package's own installed bytes are verified by a rule nobody wrote down. A second consequence for whoever builds the composed call: the rig also carries an unpinned dependency copy of the library, and the services helper that exists today (developThroughHost) calls that copy, so 'pinned develop()' holds only if the composed call routes through the per-call installed tarball and not through the helper. The invariants and packets are normative and stay NON-EPISTEMIC. Remediation SPLIT_CLAIM: name the three artifacts, give each a digest slot and an owner for its installed-content check.",
)

row(
    ["C165"],
    "DEPENDS_ON",
    J([
        "Pi's reviewed entry names the library export: " + c(PI, "src/workbench/mechanical-descriptor.ts", 'export: "develop",') + "; " + c(PI, "src/workbench/mechanical-descriptor.ts", " * its members are judged as steps 4 to 6 state, and the loader is handed the reviewed allowlist entry, never a member the"),
        "The function Pi will call is a different, not yet named export of a different package: " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "Add a *new explicit composed call* (name to ratify, e.g. invokeAuthorizedDevelopmentHost) rather than silently reinterpret existing invokeDevelopmentHost(options,input) as already authoritative.") + "; " + d("mw-03-IMPLEMENTATION-PACKETS.md", "Old invokeDevelopmentHost may remain as low-level legacy fixture API, not secure invocation claim."),
        "Pi requires export checking without naming the export: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Implement:** exact descriptor/installed package/runtime manifest checks; import @mechanical/development-rig/host only from reviewed installed artifact; reject disallowed exports and missing callback binding; don't construct a second Mechanical scheduler.") + "; " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "H01: @mechanical/development-rig/host accepts validated mechanical.pi-host/v1 binding and exact immutable package/runtime manifest; reject malformed descriptors with typed errors."),
    ]),
    "Token counts asserted by this generator: neither 'invokeDevelopmentHost' nor 'invokeAuthorizedDevelopmentHost' occurs in the six Pi files.",
    "UNDETERMINED",
    NODRIFT,
    "PREMISE GRADED: that P04's instruction to reject disallowed exports has a defined allowed export to check against. The observations C088 and C104 are unaffected and true: one reviewed entry exists, for package @mechanical/workflows-development and export develop, shared by Pi's allowlist and Mechanical's binding. What the two programs leave undetermined is the relation between that reviewed entry and the call Pi will actually make. Under both designs Pi calls a composed function exported from @mechanical/development-rig/host; Mechanical gives only an example name for it and says the name is to be ratified; Pi's allowlist entry has members for id, package, export, schemas and bindings, all describing the library, and no member for a host package or host export. So 'reject disallowed exports' has no allowed value yet, and Pi's existing loader boundary, which reads the reviewed export name from what it loads, would look for a member named develop on whatever its loader returns, and the rig host module exports no such member. Missing artifact: the ratified export name and signature, and a Pi-side reviewed slot for the host package. Until then P04's export red test cannot be written against a real name.",
)

for _manifest in ("package.json", RIG + "package.json", "packages/development/package.json", "packages/coordination/package.json"):
    with open(PINS + MW + "/" + _manifest, encoding="utf-8") as _h:
        _text = _h.read()
    assert "claude-agent-sdk" not in _text and "@forge/sdk" not in _text, _manifest

row(
    ["C227", "C146", "C166", "C211"],
    "DEPENDS_ON",
    J([
        "Pi assigns the SDK pin to Mechanical: " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "H02: production four callbacks composed from native Git census/plain task, Claude Agent SDK and Forge gate; provider SDK/runtime identity pinned; no nested developLive within implement callback."),
        "Mechanical says the rig owns the SDKs and, elsewhere, that the host supplies provider factories: " + d("mw-05-OPERATIONS-AND-HANDOFF.md", "- apps/development-rig owns host facade, native Git census/plain context, Claude Agent SDK, Forge SDK, artifact verification, durable intent/reconciliation, source custody, runtime cache and actual provider operations.") + "; " + d("mw-03-IMPLEMENTATION-PACKETS.md", "**Work:** content-addressed installed file manifest and transitive dependency proof; pin Node/SDK versions and approved paths; explicit missing artifact typed error; check installed JS integrity before import and prevent post-check mutation.") + "; " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I08 / D11 — P1 provider runtime:** packed host L2 can load injected callbacks without proving exact installed Claude/Forge SDK/executable versions or credentials."),
        "Pinned Mechanical code loads both SDKs by bare specifier at run time and declares neither: " + c(MW, RIG + "src/claude-implement.ts", 'const moduleName: string = "@anthropic-ai/claude-agent-sdk";') + "; " + c(MW, RIG + "src/claude-implement.ts", 'catch { throw new Error("CLAUDE_AGENT_SDK_NOT_INSTALLED: install @anthropic-ai/claude-agent-sdk into development-rig"); }') + "; " + c(MW, RIG + "src/live-gate.ts", 'const specifier: string = "@forge/sdk";') + "; " + c(MW, RIG + "src/live-gate.ts", 'catch { throw new Error("FORGE_SDK_NOT_INSTALLED: install a compatible public @forge/sdk package into the development-rig workspace"); }') + "; neither name occurs in the root, rig, development or coordination package.json (asserted by this generator)",
        "Pi pins its own copies of both: " + c(PI, "package.json", '"@anthropic-ai/claude-agent-sdk": "0.3.300",') + "; " + c(PI, "package.json", '"@forge/sdk": "file:vendor/forge-sdk-0.1.0.tgz",'),
        "Pi's installed-host red tests and both receipts presuppose an answer: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Red tests:** corrupt descriptor/tarball, alternate export, installed JS mutation, path/symlink escapes, unexpected function, missing SDK, incompatible Node version.") + "; Pi receipt 'sdkIdentities', Mechanical receipt " + d("mw-04-VERIFICATION-AND-RELEASE.md", '"forgeSdkIdentity":null,'),
    ]),
    "Read of the four Mechanical package manifests at 69cb016d for either SDK name: absent from all four (asserted). Read of the two dynamic-import sites: both use a bare package specifier held in a variable. Power: complete for declared dependencies and for these two import sites; other import sites of the SDKs in the rig were not enumerated.",
    "UNDETERMINED",
    NODRIFT,
    "Which Claude Agent SDK and which Forge SDK execute in the joined first release cannot be settled from either program or from the pins. A bare specifier resolves upward from the importing file's location, so if the rig is installed inside Pi's module tree the producer runs Pi's pinned copies (Claude Agent SDK 0.3.300 and Pi's vendored Forge SDK), and in a fresh external consumer it finds none and refuses. Pi's handoff assigns the pin to Mechanical; Mechanical's design both claims the SDKs for the rig and has the host pass provider factories; the manifests pin nothing. So the provider identity that both receipts must record, and that Mechanical's D11 says is unproven, is decided by an install layout nobody has specified. Missing artifact: a stated install topology for the rig relative to Pi, and a test that records the resolved SDK path and version from inside the producer. Operationally material for V4/L4: a native receipt that names an SDK version without this is reporting whichever copy happened to resolve.",
)

# ---------------------------------------------------------------------------------------------
# H. Admission order, effect intent and the lease model
# ---------------------------------------------------------------------------------------------


def _icount(side, token):
    total = 0
    for path in sorted(glob.glob(DOCS + side + "-*.md")):
        with open(path, encoding="utf-8") as handle:
            total += handle.read().lower().count(token.lower())
    return total


assert _icount("pi", "journal") == 14 and _icount("mw", "journal") == 1, (_icount("pi", "journal"), _icount("mw", "journal"))
for _t in ("single-machine", "cross-process", "same-machine", "embedded", "attached", "distributed", "hostmode", "cross-pid"):
    assert _icount("mw", _t) == 0, _t

row(
    ["C103", "C160", "C162"],
    "CONTRADICTS",
    J([
        "Pi places installation and the last check before the handoff: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "A4 acquire durable one-writer ownership keyed by canonical root; persist generation and invocation. Admission wait / installation may be asynchronous; grant and source checks are repeated *after* them.") + "; " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "A5 verify exact installed runtime manifest and native provider availability; perform a final combined authority/source/fencing check just before the first possible side effect. Do not perform long async work between last check and effect handoff without a second check.") + "; " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "A6 journal effect intent durably and send only a constrained reviewed execution plan to Mechanical. Return launch reference without claiming success/completion."),
        "and claims the exit criterion for itself: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "### P03 — Joint final-boundary authority/source recheck (P0)") + "; " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Done:** first effect cannot occur with any stale mutable authority axis."),
        "Mechanical performs asynchronous admission after it has been called, then rechecks: " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "H3 validate pinned artifact/archive and installed JS+transitive manifest in immutable managed directory, Node/runtime/sdk identities and executable providers; reject unknown versions/dependency drift.") + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "Re-check mutable authority/source/fence after async preparation.") + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "Pi owns granting, Mechanical verifies trusted attestations at its last side-effect boundary.") + "; " + d("mw-03-IMPLEMENTATION-PACKETS.md", "**Done:** no route to an effect without complete trust composition, yet no Pi imports in Mechanical core."),
        "Pinned host: an npm install of up to two minutes runs inside the call, after the caller has handed over: " + c(MW, RIG + "src/installed-host.ts", 'await exec("npm",["install","--ignore-scripts","--offline","--no-audit","--no-fund","--no-save",artifact],{') + "; " + c(MW, RIG + "src/installed-host.ts", 'cwd:root, timeout:120_000, maxBuffer:1024*1024, encoding:"utf8",') + "; " + d("mw-01-AUDIT-AND-PROOF.md", "**MW-I11 — P1 performance:** invokeInstalledDevelopment does temp npm project/install/rm for each call."),
        "Both sides already model the last check as a live read, not a snapshot: " + c(MW, RIG + "src/host-binding.ts", "export async function dispatchWriteAtFinalBoundary<T>(admitted: readonly string[], current: () => readonly string[], writer: () => Promise<T>): Promise<T> {") + "; " + c(PI, "src/workbench/function-authority.ts", "  grants(): readonly string[] | undefined;"),
    ]),
    "",
    "REFUTED",
    NODRIFT,
    "PREMISE GRADED: that the final-boundary recheck (D9, which the Pi README assigns to Pi alone) can be completed on the Pi side, with Pi's A5 check as the last check before the first possible effect. Under the companion's admission order, and in the host as it exists at the pin, long asynchronous work happens after Pi's handoff: the callee validates and installs the library inside the call. The last check before the writer is therefore Mechanical's (H4), and it can be current only if Pi's trusted context gives Mechanical live readers for grants, principal, source and fence. Pi's protocol instead describes a plan of values 'checked before invoking Mechanical' and a 'constrained reviewed execution plan' sent as data. So P03's exit criterion cannot be met by Pi-side code alone; it needs Mechanical H06 and an ABI that carries live reads. The two programs also disagree about who installs: Pi's A4/A5 install and verify the runtime before handoff, Mechanical's H3 does it after. The admission orders are proposals and stay NON-EPISTEMIC. Remediation ADD_MISSING_PREMISE on P03 (depends on MW H06; trusted context carries readers), and state which artifact each side installs.",
)

row(
    ["C112", "C122", "C174"],
    "DEPENDS_ON",
    J([
        "Pi persists an effect intent before calling Mechanical: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "A6 journal effect intent durably and send only a constrained reviewed execution plan to Mechanical. Return launch reference without claiming success/completion.") + "; " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "A1 create invocation intent id, capture host-only scope {principal,sessionId,authorizedRoot}, grants and budgets; refuse unknown authority data.") + "; " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Journal immutable events: admitted, lease_acquired, effect_intent_persisted, dispatch_requested, native_session_observed, first_edit, candidate_committed, forge_dispatched, forge_observed, effect_settled, release_fenced, release_complete."),
        "Mechanical persists one too, later, and recovery reads Mechanical's: " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "H5 persist intent and only then call provider writer.") + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "Reattaching Pi must read durable Mechanical intent, match exact invocation id and source/host identity, then perform read-only native lookup."),
        "Mechanical is of two minds about whose store it is: the host supplies it (" + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "- Trusted host context carries current effective principal/session/grants (not caller JSON), verified source attestation, active lease/fencing token, read-only runtime artifact store, cancellation and progress sink, durable effect store, provider factories, resource budget and actual current Git/Forge measurements.") + ") and the rig owns it (" + d("mw-05-OPERATIONS-AND-HANDOFF.md", "- apps/development-rig owns host facade, native Git census/plain context, Claude Agent SDK, Forge SDK, artifact verification, durable intent/reconciliation, source custody, runtime cache and actual provider operations.") + ")",
        "At the pin the store and the intent id are caller-supplied options of the standalone producer: " + c(MW, RIG + "src/live-development.ts", "readonly effectIntent?: EffectIntentStore;") + "; " + c(MW, RIG + "src/live-development.ts", "/** Intent id for the record; minted per developLive call when absent. */") + "; " + c(MW, RIG + "src/effect-intent.ts", "export function fileEffectIntentStore(path: string): EffectIntentStore {"),
        "Both receipts carry one 'intentId' without saying which record it names: " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "effects:{intentId,leaseGeneration,disposition,reconciliation}") + "; " + d("mw-04-VERIFICATION-AND-RELEASE.md", '"effects": { "intentId":null, "fencingGeneration":null, "disposition":"unknown" },'),
    ]),
    "Case-insensitive counts asserted by this generator: 'journal' occurs 14 times in the Pi files and once in the Mechanical files (in the README's packet list); the Pi files never say where Mechanical's intent record is stored or who chooses its path.",
    "UNDETERMINED",
    NODRIFT,
    "Two durable records of 'effect intent' are specified for one invocation, a Pi journal event written before the handoff and a Mechanical intent record written before the provider writer, and the relation between them is not defined by either program: which is authoritative on recovery, whether they share an id, who chooses where Mechanical's record lives, and what Pi concludes when its own journal shows the intent and the dispatch request but no Mechanical record exists (Mechanical refused in H0 to H4, or the process died before H5). That last case decides whether the lease is released or frozen. Pi's rule ('After possible side effects: publish uncertain with native ids and frozen lease.') does not say whether the handoff or the provider-writer call is that boundary; Mechanical's Q20 expects a safe release when 'all host checks deny'. Missing artifact: a joint recovery table over the two records (present/absent, settled/uncertain) with the lease consequence of each cell, and one definition of 'intentId'.",
)

_no_mw_lease = expect_zero(MW, [RIG + "src", RIG + "test"], ["WriterLeases", "writerLease", "leaseGeneration", "fencingGeneration", "fenceToken", "fencingToken", "ownerId"])

row(
    ["C117", "C042", "C043"],
    "SUPPORTS",
    J([
        c(PI, "src/workbench/source-admission.ts", "readonly #held = new Map<string, WriterLease>();"),
        c(PI, "src/workbench/source-admission.ts", " * The lease rule 7 takes is released when a later rule refuses and when dispatch settles; an error dispatch throws propagates"),
        c(PI, "src/workbench/source-admission.ts", "    host.leases.release(lease);"),
        c(PI, "src/workbench/source-admission.ts", "One WriterLeases registry binds the"),
        "Mechanical has nothing to compare it with: " + _no_mw_lease + "; the v1 binding carries only " + c(MW, RIG + "src/host-binding.ts", '  literal(intent, "intent", "writer", "single");'),
        "and assigns the authority to Pi: " + d("mw-05-OPERATIONS-AND-HANDOFF.md", "- Pi owns registered tools, global permissions, invocation lifetime, lease authority, observation scope, UI/TUI and scheduling."),
    ]),
    "Text search of the Mechanical rig source and tests at 69cb016d for lease and fencing identifiers (WriterLeases, writerLease, leaseGeneration, fencingGeneration, fenceToken, fencingToken, ownerId): 0 files (asserted). A case-insensitive search for 'lease' and 'fenc' in the rig source hits only unrelated words (fenced JSON blocks in claude-review.ts, 'released' in select-bead-cli.ts, 'prerelease' in invocation-identity.ts, a 'Source-version-fenced' comment in git-source-publication.ts). Power: complete for a writer-lease or fencing implementation under those or similar names in the rig.",
    "ESTABLISHED",
    NODRIFT,
    "Pi's lease at the pin is an in-memory map in one host process, taken at admission and released in a finally block when the dispatch promise settles; the record holds a canonical root and an invocation id and no generation or owner. Mechanical has no writer lease or fence in code at all: the string 'single' in the binding is a declaration, not an enforcement. The joint reading: there is no process-local versus distributed disagreement in the code today because only one side has a lease, and every durable, cross-process or fenced behaviour both programs require is new work on both sides.",
)

row(
    ["C062", "C114", "C115", "C116", "C156", "C193"],
    "CONFLICTS_WITH",
    J([
        "Where both programs agree: lease authority is Pi's (" + d("mw-05-OPERATIONS-AND-HANDOFF.md", "- Pi owns registered tools, global permissions, invocation lifetime, lease authority, observation scope, UI/TUI and scheduling.") + "), the first release is one machine with cross-process exclusion (" + d("pi-02-PROTOCOL-AND-RUNTIME.md", "- First release: a documented, durable single-machine lock/journal and cross-process exclusivity, not the existing process-local WriterLeases alone. For distributed fleet use a coordinator with monotonic fencing generations; tests must falsify stale-worker writes.") + "; " + d("mw-04-VERIFICATION-AND-RELEASE.md", "| Q18 | two Pi host processes same canonical root, first worker alive after launch handle | only one writer, other fenced |") + ")",
        "Strength of stale-fence rejection at the provider: Pi " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Use explicit fencing + final-boundary revalidation + durable intent; document the remaining window and have the provider reject a stale fence where possible.") + " against Mechanical " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "Explicitly document the remaining asynchronous dispatch window and enforce fences at provider write entry.") + ", a release veto (" + d("mw-04-VERIFICATION-AND-RELEASE.md", "- The composed host accepts model-supplied authority, unverified effects, stale fence or mismatched source.") + ") and a test (" + d("mw-04-VERIFICATION-AND-RELEASE.md", "| Q17 | host grant revoked, principal changed, source changed during async import, stale writer fence | no SDK/writer/Forge effect |") + ")",
        "Who holds ownership: Pi " + d("pi-01-AUDIT-AND-INVARIANTS.md", "A second host/process sees the same authoritative lease.") + " against Mechanical " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "The main write precondition checks *current* approved root/source/grants/fence, and holds exclusive ownership until native terminal proof."),
        "The handle has five names and no format: Pi " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Lease = {rootRealpath, invocationId, generation, ownerId, acquiredAt, state, heartbeat/fencing metadata}.") + " and 'durable lease token' and receipt field leaseGeneration; Mechanical 'active lease/fencing token', " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "Use effect-intent/v1 as lineage; introduce an additive v2 if needed for full invocation identity, fencing generation, effect class, authoritative native records and terminal disposition.") + ", " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "evidence strength, effect intent/lease id, principal/session only in authorized internal records") + " and receipt field fencingGeneration",
        "The serialized binding is closed and has no member for it: " + c(MW, RIG + "src/host-binding.ts", 'const root = closed(top, "", ["contract", "descriptorId", "artifact", "source", "invocationId", "evidenceProfile", "contextProfile", "intent"]);'),
        "Mechanical's veto leans on an undefined term: " + d("mw-04-VERIFICATION-AND-RELEASE.md", "- Kill/restart can produce a second writer in supported topology; source tree changes while an old gate is credited."),
    ]),
    "Case-insensitive counts over the six Mechanical files, asserted by this generator: 'single-machine', 'cross-process', 'same-machine', 'embedded', 'attached', 'distributed', 'cross-PID' and 'hostMode' each occur 0 times. Mechanical's topology wording is limited to 'supported topology', 'process/host topologies', 'two Pi host processes', 'two hosts recovering one intent' and, for later variants, 'cross-host' and 'detached fleet hosting'.",
    "NON-EPISTEMIC",
    NODRIFT,
    "The lease models do not contradict each other on process-local versus distributed: both programs put the first release on one machine with exclusion across processes, and both defer a multi-host coordinator. The conflicts are at the interface. (1) Modality: Pi asks the provider to reject a stale fence 'where possible'; Mechanical makes acceptance of a stale fence a release veto and a Q-test. One of the two must give. (2) Mechanism: for Mechanical to check a fence at provider write entry it needs the current generation, which lives in Pi's lease store; neither program defines the token, its format, or the call by which Mechanical asks whether it is still current, and the closed v1 binding cannot carry it, so it exists only as an unnamed member of the trusted host context. (3) Holder: Mechanical's sentence says its write precondition 'holds exclusive ownership', which reads as a second owner beside Pi's authoritative lease. (4) Scope: Mechanical never states the first-release topology, so its veto on 'supported topology' can be evaluated only by importing Pi's definition. Needs a ratified fence interface (token fields, who verifies, against what store) and one sentence in the Mechanical program naming the supported topology.",
)

# ---------------------------------------------------------------------------------------------
# I. Field-level agreement at the pins: source, digests, grants, descriptor status
# ---------------------------------------------------------------------------------------------
_pi_grant = _re.compile(r"^[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*$")
_pi_host_grant = _re.compile(r"^(?:[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*|claude:tool:[A-Za-z][A-Za-z0-9_-]{0,63})$")
_mw_grant = _re.compile(r"^[a-z][a-z0-9-]*:[a-z][a-z0-9-]*$")
assert _pi_grant.match("mechanical:develop-write") and _mw_grant.match("mechanical:develop-write")
assert _pi_grant.match("org.fixture-fn:develop-write") and not _mw_grant.match("org.fixture-fn:develop-write")
assert _pi_host_grant.match("claude:tool:Read") and not _mw_grant.match("claude:tool:Read")
_no_pi_spelling = expect_zero(PI, ["src", "test"], ["mechanical:develop-write", "git-census-v1", "plain-v1"])
_no_mw_identity = expect_zero(MW, [RIG + "src", "packages"], ["workbench.identity"])
_pi_spelling_files = files_naming(PI, ["docs", ".beads", ".agents", "README.md", "AGENTS.md", "new-feedback", "qa", "examples"], "mechanical:develop-write", suffixes=(".md", ".json", ".jsonl", ".ts"))
_pi_spelling_groups = sorted(set("/".join(x.split("/")[:4]) if x.startswith("docs/workbench/programs/") else "/".join(x.split("/")[:3]) if x.startswith("docs/programs/") else x for x in _pi_spelling_files))
assert _pi_spelling_groups == [".beads/issues.jsonl", "docs/programs/mechanical-native-interoperability-2026-11-09", "docs/workbench/programs/mechanical-native-interoperability-2026-11-09"], _pi_spelling_groups
assert len(_pi_spelling_files) == 8, _pi_spelling_files

row(
    ["C087"],
    "SUPPORTS",
    J([
        "Binding shape: " + c(MW, RIG + "src/host-binding.ts", 'export const HOST_BINDING_CONTRACT = "mechanical.pi-host/v1" as const;') + "; " + c(MW, RIG + "src/host-binding.ts", 'const source = closed(root["source"], "source", ["workspaceRealpath", "baseCommit", "baseTree", "forgeManifestSha256"]);') + "; " + c(MW, RIG + "src/host-binding.ts", 'const root = closed(top, "", ["contract", "descriptorId", "artifact", "source", "invocationId", "evidenceProfile", "contextProfile", "intent"]);'),
        "Pi's plan names the same four source facts: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "pinning source {workspaceRealpath, HEAD commit, HEAD tree, forge.toml sha256}"),
        "Pi's measured identity has the matching members plus three more: " + c(PI, "src/workbench/source-admission.ts", "  readonly gateManifest: { readonly path: string; readonly sha256: string };") + "; " + c(PI, "src/workbench/source-admission.ts", '  readonly dirtiness: "clean";') + "; " + c(PI, "src/workbench/source-admission.ts", "  /** identityDigest(SOURCE_IDENTITY_DOMAIN, the five members above). */"),
        "Object-id grammar differs: Pi " + c(PI, "src/workbench/source-admission.ts", "const OBJECT_ID = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/;") + " against Mechanical " + c(MW, RIG + "src/host-binding.ts", "const GIT_ID = /^[0-9a-f]{40}$/;"),
        "Manifest location differs: Pi takes a host-declared path, Mechanical reads a fixed file: " + c(MW, RIG + "src/live-development.ts", 'const originalGateManifest = readFileSync(join(root, "forge.toml"));'),
    ]),
    "",
    "ESTABLISHED",
    NODRIFT,
    "The embedded premise is true as stated: the binding contract exists at the Mechanical pin with exactly this closed shape, and Pi's four 'pinning source' facts map one to one onto its source member (canonicalRoot to workspaceRealpath, commit to baseCommit, tree to baseTree, gateManifest.sha256 to forgeManifestSha256; both sides spell the manifest hash 'sha256:' plus hex). Two edge disagreements sit beneath the agreement and are in neither program's ratification list: Pi measures 40- or 64-hex object ids while the binding validator accepts 40 only, so a SHA-256 repository that Pi admits produces a binding Mechanical refuses; and Pi's manifest is a host-declared path while Mechanical's producer reads forge.toml at the root. Neither affects the first release on a SHA-1 repository whose gate manifest is forge.toml.",
)

row(
    ["C099", "C153", "C146"],
    "DEPENDS_ON",
    J([
        "Pi's inputDigest is a domain-separated hash, not a hash of the canonical bytes: " + c(PI, "src/workbench/execute.ts", 'inputDigest: identityDigest("workflow-execute-input", JSON.parse(inputText)),') + "; " + c(PI, "src/workbench/identity.ts", "workbench.identity/v1\\u0000${domain}\\u0000${canonicalJson(value)}"),
        "Mechanical is to compare against it: " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "H0 decode closed model request, compare with host-prepared canonical input digest, descriptor ID, schema and artifact."),
        "The joint tests speak of bytes and vectors, not of digest construction: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Red tests:** incompatible schema or spelling; unadopted grant; producer/consumer disagree on canonical JSON bytes.") + "; " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Done:** callback input deep-equals admitted payload and hashes to stored inputDigest; no leaking note bytes.") + "; " + d("mw-03-IMPLEMENTATION-PACKETS.md", "**Falsifiers:** unknown v1 variant, extra profile, incorrect grant spelling, descriptor digest mismatch, deliberately diverging Pi/Mechanical vectors."),
        "Mechanical has a canonicalizer for bindings only and no knowledge of Pi's digest domain: " + c(MW, RIG + "src/host-binding.ts", "/** Key-order independent, whitespace free UTF-8 bytes of a binding. */") + "; " + _no_mw_identity,
        "The same private scheme sits under the attestation Mechanical is asked to verify: " + c(PI, "src/workbench/source-admission.ts", '  if (attestation.sourceIdentity !== identity.digest) return refusal("attestation-stale");'),
        "Digest encodings are not uniform even inside Mechanical: " + c(MW, RIG + "src/live-development.ts", 'const gateManifestSha256 = createHash("sha256").update(originalGateManifest).digest("hex");') + " (bare hex, the value stored in the effect-intent record) against " + c(MW, RIG + "src/host-binding.ts", "const SHA256 = /^sha256:[0-9a-f]{64}$/;"),
    ]),
    "Text search of the Mechanical rig source and packages for 'workbench.identity': 0 files (asserted). Read of host-binding.ts for a canonicalizer: one, canonicalHostBindingBytes, typed for a binding. Power: complete for an existing Mechanical implementation of Pi's digest scheme or of input canonicalization in the rig.",
    "UNSUPPORTED",
    NODRIFT,
    "PREMISE GRADED: that agreeing on canonical JSON bytes, which is what P00's red test names (H00's falsifier speaks only of 'diverging Pi/Mechanical vectors'), is enough for Mechanical's H0 to compare the 'host-prepared canonical input digest'. It is not shown anywhere. At the pin Pi's inputDigest is SHA-256 over a Pi-private prefix (the literal workbench.identity/v1, a NUL, the domain 'workflow-execute-input', a NUL) followed by the canonical JSON, so two sides can agree on every byte of the payload and still compute different digests unless Mechanical reimplements Pi's identity scheme or Pi exposes a second, plain digest. Neither program names the digest construction as a ratification item, and the same question applies to the source-identity digest inside Pi's write-boundary attestation, given that mw-02 H2 has Mechanical verify 'trusted attestations'. Hex encoding is also unsettled: the binding and Pi use 'sha256:' plus hex, Mechanical's effect-intent record stores bare hex for the gate manifest. The proposals themselves stay NON-EPISTEMIC. Remediation ADD_MISSING_PREMISE: add 'digest construction and encoding' to the joint vectors, with a fixture giving payload bytes and the expected digest on both sides.",
)

row(
    ["C145", "C093", "C028"],
    "SUPPORTS",
    J([
        "Mechanical witnesses: " + c(MW, RIG + "src/host-binding.ts", 'export const WRITE_GRANT = "mechanical:develop-write" as const;') + "; " + c(MW, RIG + "src/host-binding.ts", 'export const EVIDENCE_PROFILES = ["git-census-v1", "hx-task-scope-v1"] as const;') + "; " + c(MW, RIG + "src/host-binding.ts", 'export const CONTEXT_PROFILES = ["plain-v1", "rf-committed-v1"] as const;'),
        "Pi has none in source or tests: " + _no_pi_spelling + "; outside them the grant spelling occurs in 8 files at the pin: 3 November 9 program documents, 4 files of the November 9 triage tree and .beads/issues.jsonl (asserted by this generator)",
        "The grant is representable in both grammars (checked by this generator against both regular expressions): " + c(PI, "src/workbench/function-authority.ts", "const GRANT = /^[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*$/;") + "; " + c(MW, RIG + "test/host-binding.test.ts", "assert.equal(isRepresentableGrant(WRITE_GRANT), true);") + "; and it is outside the namespace Pi reserves: " + c(PI, "src/workbench/function-authority.ts", 'const PI_NAMESPACE = "workbench:";'),
    ]),
    "Text search of Pi src/ and test/ at 0fb90672 for 'mechanical:develop-write', 'git-census-v1' and 'plain-v1': 0 files (asserted). Power: complete for the literal spellings in Pi source and tests; program documents are excluded by design.",
    "ESTABLISHED",
    NODRIFT,
    "Per identifier and per repository: the grant spelling and both profile identifiers are witnessed in Mechanical code and absent from Pi code. That is consistent with both programs calling the grant a candidate and the route unbuilt, and it means every Pi statement about the profile pair is, at the pin, a statement about a Mechanical constant. The spelling would pass Pi's adoption grammar and is not in Pi's own namespace, so nothing in Pi's code blocks adopting it once ratified. One clause of C145 needs widening: the spelling appears in Pi not only in the November 9 program documents but also in that program's triage tree and in the Beads issue store; it is still absent from source and tests, which is the material point.",
)

row(
    ["C135"],
    "CONTRADICTS",
    J([
        "Mechanical's statement of Pi's grammar: " + c(MW, RIG + "src/host-binding.ts", "/** A grant token Pi's permission grammar can represent: exactly two segments, no third colon. */") + "; " + c(MW, RIG + "src/host-binding.ts", "export const isRepresentableGrant = (token: string): boolean => /^[a-z][a-z0-9-]*:[a-z][a-z0-9-]*$/.test(token);") + "; pinned by " + c(MW, RIG + "test/host-binding.test.ts", '["the adopted grant with a suffix segment", "mechanical:develop-write:extra", "WRITE_GRANT_UNREPRESENTABLE"],'),
        "Pi's actual grammars: " + c(PI, "src/workbench/function-authority.ts", "const GRANT = /^[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*$/;") + "; " + c(PI, "src/workbench/function-authority.ts", "const HOST_GRANT = /^(?:[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*|claude:tool:[A-Za-z][A-Za-z0-9_-]{0,63})$/;") + "; " + c(PI, "src/workbench/function-authority.ts", "const TRANSPORT_GRANT_CHARS = 256;") + "; a dotted grant is one of Pi's own pinned stand-ins: " + c(PI, "src/workbench/function-authority.ts", "the namespace other-fn, org.fixture-fn:develop-write, the exact action extended by -all, -admin, .sub, 2 or"),
        "The item is on the joint list: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "ABI handshake: descriptor id/schema, host version, export names, write grant grammar, input/output closed JSON, progress/event vocabulary, result semantics, native refs, evidence profile, runtime manifest, disposition, cancellation, retry law."),
    ]),
    "Both regular expressions were compiled by this generator and run on three probes: 'mechanical:develop-write' matches both; 'org.fixture-fn:develop-write' matches Pi's action grammar and not Mechanical's; 'claude:tool:Read' matches Pi's host-grant grammar and not Mechanical's.",
    "REFUTED",
    NODRIFT,
    "PREMISE GRADED: that the write-grant grammar is already common ground, as Mechanical's code comment asserts when it describes 'Pi's permission grammar'. At the pins it is not: Pi admits dots in both segments, bounds an action grant at 256 characters and treats three-segment claude:tool: grants as known permission data; Mechanical's helper admits no dot, has no length bound and calls any third colon unrepresentable. The first-release spelling is unaffected, and in Mechanical the helper only chooses between two diagnostic codes for a near-miss grant, so the practical effect today is a wrong diagnostic for a dotted or tool grant. It is nevertheless a code-level disagreement on an item both programs list for ratification. The handshake proposal itself stays NON-EPISTEMIC. Remediation: a shared grammar fixture (accepted and refused spellings) in the joint vectors.",
)

row(
    ["C135"],
    "DEPENDS_ON",
    J([
        "Both validators hard-code one status by strict equality: " + c(PI, "src/workbench/mechanical-descriptor.ts", 'export const MECHANICAL_DESCRIPTOR_STATUS = "descriptor-only";') + "; " + c(MW, RIG + "src/entrypoint-host.ts", 'd.implementation.export !== "develop" || d.status !== "descriptor-only" ||'),
        "The descriptor of record carries it and disclaims hosting: " + c(MW, "contracts/entrypoints/development.v1.json", '"status": "descriptor-only",') + "; " + c(MW, "contracts/entrypoints/development.v1.json", '"note": "No remote host loader or generic invocation transport is implemented. Artifact binding belongs to the deployment host."'),
        "Both programs use the same word for the legacy, low-trust state: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Old v1 descriptors without mandatory new assurances remain descriptor-only or legacy-weak; never silently promote.") + "; " + d("mw-01-AUDIT-AND-PROOF.md", "Keep legacy pure installed fixture API as descriptor-only/low-trust where needed.") + "; " + c(MW, RIG + "src/host-binding.ts", " * and the status stays descriptor-only until an invocable package has separately passed joint ratification with Pi."),
        "Pi already pins that another value is refused: " + c(PI, "src/workbench/mechanical-descriptor.ts", "quiet row R007-20: status written invocable then descriptor-only is admitted"),
    ]),
    "",
    "UNDETERMINED",
    NODRIFT,
    "PREMISE GRADED: that the status of a ratified first-release descriptor is fixed by the handshake both programs describe. The observations C104 and C027 about what the validators and the descriptor hold today are unaffected and true. What status value the first-release descriptor carries cannot be determined from either program. Read literally, Pi says descriptors without the new assurances 'remain descriptor-only' and Mechanical keeps its legacy fixture API as 'descriptor-only/low-trust', which implies that a ratified, invocable descriptor is something else; Mechanical's source says the status stays descriptor-only 'until' ratification. Yet both validators at the pins admit exactly the string descriptor-only and refuse anything else, Pi as status-unsupported and Mechanical as ENTRYPOINT_CONTRACT_INVALID, and neither program lists the status value, or the coordinated validator change, among the items to ratify. If the status stays descriptor-only after ratification, the first-release descriptor is indistinguishable by status from the old ones the programs say must never be promoted. Missing artifact: the ratified status vocabulary and the order in which the two validators change. A producer-side flip without the Pi change would make Pi's descriptor boundary refuse the descriptor as status-unsupported, which is step A0 of Pi's proposed admission.",
)

# ---------------------------------------------------------------------------------------------
# J. Observation surface: progress, native references, certificate, placement, runtime
# ---------------------------------------------------------------------------------------------
_no_pi_stages = expect_zero(PI, ["src", "test"], ["sdk_startup", "gate_dispatch"])
_no_pi_gate_fields = expect_zero(PI, ["src"], ["gate_passed", "gate_definition", "execution_environment"])
_no_attached_mode = expect_zero(PI, ["src"], ['"attached"', "'attached'"])

row(
    ["C122", "C127"],
    "CONFLICTS_WITH",
    J([
        "Pi's proposed event names: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Journal immutable events: admitted, lease_acquired, effect_intent_persisted, dispatch_requested, native_session_observed, first_edit, candidate_committed, forge_dispatched, forge_observed, effect_settled, release_fenced, release_complete.") + "; " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Pi invocation; package + descriptor digest; source commit/tree; Mechanical domain outcome and provider stage;"),
        "Mechanical's existing, test-pinned stage names: " + c(MW, RIG + "src/progress-stages.ts", 'export const PROGRAM_STAGES = ["discovery", "context", "sdk_startup", "first_edit", "commit", "gate_dispatch", "settlement"] as const;') + "; " + c(MW, RIG + "src/progress-stages.ts", " * The program names seven lifecycle stages; the rig receipt reports a different, older set. This module defines both and the"),
        "Each program claims to define the protocol: Pi " + d("pi-03-IMPLEMENTATION-PACKETS.md", "+-> P06 observation contract [parallel] -+-------------+---------------------+--> P07 journal/control/reconcile") + "; Mechanical " + d("mw-03-IMPLEMENTATION-PACKETS.md", "**Work:** attach Pi invocation id and original native ids to durable intent; progress stages with idempotent producer event identities; expose read-only resume/reconcile and distinct cancellation requested/established. Never let progress callbacks decide correctness.") + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "H6 emit append-only producer progress and native references into host callback, preserving real reason codes; submit domain result and effect settlement independently."),
        "Pi has no witness of the producer's names: " + _no_pi_stages,
    ]),
    "Text search of Pi src/ and test/ for the producer stage names 'sdk_startup' and 'gate_dispatch': 0 files (asserted). Comparison of the two lists: one name is common to both, first_edit.",
    "NON-EPISTEMIC",
    NODRIFT,
    "Both lists are vocabulary for the item the ABI handshake calls 'progress/event vocabulary', and they share one name. Mapping by meaning: sdk_startup ~ native_session_observed; first_edit = first_edit; commit ~ candidate_committed; gate_dispatch ~ forge_dispatched; settlement ~ forge_observed and effect_settled. Pi has no event for the producer's first two stages, discovery and context, although its observation must show the 'provider stage' and a needs_evidence run ends in discovery. Mechanical's seven stages already exist in code with a committed mapping to an older receipt vocabulary, so there are three stage vocabularies before ratification. Direction is also unsettled: Pi's graph has P06 define an 'observation contract' in parallel with everything else, while Mechanical's H07 defines the producer progress protocol late in its chain. Needs a ruling on which side owns the vocabulary and a mapping table in the joint vectors.",
)

row(
    ["C128", "C172", "C203"],
    "CONFLICTS_WITH",
    J([
        "Pi's rule and shape: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Native refs use provider/type/id/scope; never fake names for absent IDs.") + "; " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "Null stays null; never fabricate native IDs.") + "; " + c(PI, "src/workbench/observation.ts", "export interface NativeRef { provider: string; type: string; id: string; scope?: string }"),
        "Mechanical's rule and shapes: " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "Missing identity = null/uncertain, never synthetic.") + "; " + c(MW, RIG + "src/effect-reconciliation.ts", 'export interface EvidenceRef { readonly system: "git" | "forge"; readonly kind: string; readonly id: string }') + "; " + c(MW, RIG + "src/progress-stages.ts", "  readonly agentSessionId: string | null;"),
        "A Mechanical id slot can hold the word 'uncertain': " + c(MW, RIG + "src/host-services.ts", '  readonly claude_session_id: string | "uncertain" | null;') + "; " + c(MW, RIG + "src/host-services.ts", '  const named = (id: string | null): string => (typeof id === "string" && id.trim().length > 0 ? id : "uncertain");'),
        "Pi's planned red tests: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Red tests:** out-of-order/gap, duplicate native event, collapsed verification_failed vs indeterminate, blank native id, wrong scope, truncation, failed progress observer, native record unavailable."),
    ]),
    "",
    "NON-EPISTEMIC",
    NODRIFT,
    "Two rules that read alike and differ in one word. Pi: an absent id is null and nothing stands in for it. Mechanical: a missing identity is 'null/uncertain', and its receipt helper for the Pi function host already writes the literal string uncertain into the session-id and operation-id slots when the producer answered without an id. A bridge that copies that slot into a Pi native reference would publish an id that is neither null nor addressable, which is what Pi's rule and its P17 row forbid, and Pi's 'blank native id' red test would not catch it because the value is not blank. The reference shapes also differ in member names (provider/type/id/scope against system/kind/id, and flat named refs in progress events), with no Mechanical source for Pi's scope member. Needs one ratified representation of 'producer answered, id unknown' that is not a string in an id field, and a field mapping for references.",
)

row(
    ["C225"],
    "SUPPORTS",
    J([
        c(PI, "src/workbench/execute.ts", 'if (launchStatus === "launched" && reportedRefs.length === 0) return fail("A launched reply requires at least one native reference.");'),
        c(PI, "src/workbench/execute.ts", 'export type LaunchStatus = "accepted" | "launched" | "refused";'),
        "against the illustration " + d("pi-05-OPERATIONS-AND-HANDOFF.md", '"nativeRefs":[],') + " under " + d("pi-05-OPERATIONS-AND-HANDOFF.md", '"status":"launched",'),
        "and the packet test " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Red tests:** invoke the actual registered Pi tool, assert Mechanical function callback reached exactly once; absent grant -> zero callbacks; function refuses if not reviewed; first successful launch returns invocation+native refs while worker continues."),
        "Producer side: the first native id appears at the third stage, after the launch has returned: " + c(MW, RIG + "src/progress-stages.ts", "/** Latest native refs known when the stage was reached; null means not yet observed, never fabricated. */") + "; " + c(MW, RIG + "src/progress-stages.ts", 'export const PROGRAM_STAGES = ["discovery", "context", "sdk_startup", "first_edit", "commit", "gate_dispatch", "settlement"] as const;'),
    ]),
    "",
    "ESTABLISHED",
    NODRIFT,
    "C225's observation is correct at the pin: Pi's reply builder refuses a launched reply with no native reference, so the illustrated launch reply cannot be produced as drawn. The joint lens adds the reason no honest reference exists at that moment: every Mechanical-native id (agent session, candidate commit, Forge operation) is first known after the producer has started, the earliest at sdk_startup, while P05 wants the launch to return 'while worker continues' and also to carry native refs. The three statements are satisfiable together only if Pi returns status accepted with no reference, or mints a Pi-native reference, or delays the reply until the producer reports a session. Neither program chooses. Needs a ruling before P05's red test is written.",
)

row(
    ["C127", "C063", "C185"],
    "DEPENDS_ON",
    J([
        "The proof object is Mechanical's and Pi is its consumer: " + d("mw-05-OPERATIONS-AND-HANDOFF.md", "| H01 strict native certificate | Pi P06 observation, P08 native release | Forge PASS string or local HEAD |") + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", 'schema: "mechanical.forge-certificate/v1";') + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "nativeGateDefinitionSha256: string;") + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "admittedManifestSha256: string;"),
        "Pi describes the content and never the object: " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "Claude session; Forge operation/native receipt; environment/gate-definition completeness; last known effect disposition;") + "; " + d("pi-01-AUDIT-AND-INVARIANTS.md", "**I6 Distinct statements:** accepted/launched != completed; Mechanical verified_candidate is a domain claim requiring validated native evidence, not merely an SDK response or Forge transport success; observed status does not grant control."),
        "The host call returns only the domain outcome, and the outcome has no room for it: " + c(MW, RIG + "src/host.ts", "export async function invokeDevelopmentHost(options: DevelopmentHostOptions, input: unknown): Promise<DevelopmentOutcome> {") + "; " + c(MW, RIG + "src/entrypoint-host.ts", 'if (!validOutcome(raw, request)) throw new Error("ENTRYPOINT_OUTPUT_INVALID: producer outcome is incomplete or inconsistent");') + "; " + c(MW, "packages/development/src/contracts.ts", "export interface SubjectBasis {") + " (workspaceId and revision; no tree)",
        "Pi has its own Forge observer, which reads the commit and tree pin and none of the strict axes: " + c(PI, "src/workbench/forge-operation-observer.ts", 'const GATED_COMMIT_FIELD = "gated_commit";') + "; " + _no_pi_gate_fields,
        "Mechanical warns against exactly this inside its own program: " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "Avoid redundant inconsistent oracles."),
    ]),
    "Case-sensitive count asserted by this generator: the string 'ertificate' occurs 0 times in the six Pi files and the certificate is named 22 times in the Mechanical files. Text search of Pi src/ for the Forge fields gate_passed, gate_definition and execution_environment: 0 files.",
    "UNDETERMINED",
    NODRIFT,
    "Two things cannot be settled from either program. First, how the strict certificate reaches Pi: the Pi corpus never names it, the existing host call returns a validated domain outcome whose basis carries a commit and no tree, and the companion does not give the composed call's return type or say whether the certificate travels in the result, in a progress event or through a separate read. Second, who decides the assurance Pi displays: Pi's invariant requires 'validated native evidence' without saying who validates, Pi already has a Forge operation observer that knows nothing of gate_passed, gate definition or environment, and Mechanical will have the certificate. If both sides judge the same Forge frame they can disagree, which Mechanical's own text calls redundant inconsistent oracles. Missing artifacts: the composed call's result and event types, and a statement that one side's assurance is authoritative. Both receipts also carry a single gateDefinitionSha256 where the certificate separates the native definition hash from the admitted manifest hash.",
)

row(
    ["C029"],
    "CONTRADICTS",
    J([
        "Three Pi statements about first-release placement: " + d("pi-README.md", "First supported vertical: host-reviewed mechanical.development.develop.v1, attached or explicitly admitted same-machine execution,") + "; " + d("pi-02-PROTOCOL-AND-RUNTIME.md", 'hostMode:"embedded" for first cut,') + "; " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "First: embedded same-machine Pi host, reviewed ordinary develop, Git census/plain context, single-writer runtime with cross-PID fence and native Forge evidence. Later: attached/detached variants,"),
        "Pi's code has two host modes and neither is 'attached': " + c(PI, "src/workbench/execute.ts", 'export const EXECUTE_HOST_MODES: readonly ExecuteHostMode[] = Object.freeze(["embedded", "detached"] as const);') + "; " + _no_attached_mode,
        "Pi wants the mode ratified jointly: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Implement:** signed-off literal descriptor ID/version, exact action grant mechanical:develop-write, canonical input rule, first host mode, profile set, versioned test vectors; record both source SHAs, installed Node/SDK identity."),
        "Mechanical has no host-mode concept to ratify: the binding's eight closed members hold none (" + c(MW, RIG + "src/host-binding.ts", 'const root = closed(top, "", ["contract", "descriptorId", "artifact", "source", "invocationId", "evidenceProfile", "contextProfile", "intent"]);') + ") and its H00 list names none",
    ]),
    "Text search of Pi src/ for the quoted literals \"attached\" and 'attached': 0 files; a word search finds 'attached' only as an English participle in six comments. Case-insensitive counts over the six Mechanical files: 'embedded', 'attached', 'hostMode' and 'same-machine' each 0 (asserted).",
    "REFUTED",
    NODRIFT,
    "Both facets of C029 fail. (i) No execution placement called 'attached' exists in Pi at the inspected revision: the host-mode enumeration is embedded and detached. If 'attached' is meant as a description of embedded, the README names an existing mode by a word the code does not use. (ii) The corpus does not use one placement vocabulary: the README makes 'attached' part of the first release, document 05 lists 'attached/detached variants' as later, and document 02 says embedded. The joint consequence is that 'first host mode' is on Pi's ratification list and has no counterpart in the companion, whose contract, receipts and prose never mention a host mode; Mechanical would be ratifying a value for a field its ABI does not have. Narrower statement the evidence supports: the first release runs the function in Pi's embedded host mode on one machine. Remediation NARROW_SCOPE: replace 'attached or explicitly admitted same-machine' with the code's mode name, and obtain a ruling on whether host mode is a Pi-only fact or a binding member.",
)

row(
    ["C218"],
    "SUPPORTS",
    J([
        c(PI, "package.json", '"node": ">=24"'),
        c(MW, RIG + "package.json", '"node": ">=22.18.0 <25"'),
        "Mechanical's matrix names both lines for the installed-host tier: " + d("mw-04-VERIFICATION-AND-RELEASE.md", "use supported Node 22/24 and record exact version."),
        "The committed L2 run used the overlapping line: " + c(MW, M05, '"node_version": "v24.20.0",'),
        "Pi plans the negative: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Red tests:** corrupt descriptor/tarball, alternate export, installed JS mutation, path/symlink escapes, unexpected function, missing SDK, incompatible Node version."),
    ]),
    "",
    "ESTABLISHED",
    NODRIFT,
    "The two engine ranges overlap only on Node 24. Mechanical's 'Node 22/24' is right for tiers that do not load Pi (its L2 and L3) and cannot apply to any joined tier, because Pi refuses to install below 24; neither program says so. A receipt for V3, V4/L4 or V5/L5 on Node 22 is impossible, and one that reports Node 22 would be evidence of a run that did not go through Pi.",
)

_no_pi_import = expect_zero(MW, ["packages", RIG + "src"], ["pi-subagents", "@earendil-works", "@pi/"])

row(
    ["C134"],
    "SUPPORTS",
    J([
        "Exports map: " + c(MW, RIG + "package.json", '"./host": {') + " and " + c(MW, RIG + "package.json", '"./package.json": "./package.json"') + ", nothing else",
        "Facade exports: " + c(MW, RIG + "src/host.ts", 'export { HostBindingError, WRITE_GRANT, admitHostBinding, dispatchWriteAtFinalBoundary, validateHostBinding } from "./host-binding.js";') + "; " + c(MW, RIG + "src/host.ts", "export const HOST_API_VERSION = HOST_BINDING_CONTRACT;") + "; " + c(MW, RIG + "src/host.ts", "export class HostAdmissionError extends Error {") + "; " + c(MW, RIG + "src/host.ts", "export async function invokeDevelopmentHost(options: DevelopmentHostOptions, input: unknown): Promise<DevelopmentOutcome> {"),
        "Four callbacks: " + c(MW, RIG + "src/host-services.ts", 'export const HOST_SERVICE_NAMES = ["discover", "compileContext", "implement", "verify"] as const;'),
        "No Pi import: " + _no_pi_import,
    ]),
    "Text search of MW packages/ and apps/development-rig/src at 69cb016d for 'pi-subagents', '@earendil-works' and '@pi/': 0 files (asserted). Power: complete for an import of Pi's package, its peer framework or a Pi scope in Mechanical library and rig source.",
    "ESTABLISHED",
    NODRIFT,
    "All three parts of the premise hold at the pin. The dependency direction both programs require (Mechanical never imports Pi; Pi reaches Mechanical only through ./host) is the state of the code today, so every new capability Pi needs from Mechanical must arrive as a new export of that one subpath.",
)

# ---------------------------------------------------------------------------------------------
# K. Where the two programs genuinely agree, and the shared no-CI sentence
# ---------------------------------------------------------------------------------------------
row(
    ["C090"],
    "SPECIALIZES",
    J([
        "Core, as the premise says: three required string members, emptiness refused, no check for extra members: " + c(MW, "packages/development/src/develop.ts", "throw new TypeError(`INVALID_DEVELOPMENT_REQUEST: ${name} must be a nonempty string`);") + "; " + c(MW, "packages/development/src/contracts.ts", "export interface DevelopmentRequest {"),
        "Host layer, which the premise does not mention, is closed at run time: " + c(MW, RIG + "src/entrypoint-host.ts", "  if (!v || Object.keys(v).length !== fields.length || fields.some(key => typeof v[key] !== \"string\" || !(v[key] as string).trim())) {") + "; " + c(MW, RIG + "src/entrypoint-host.ts", 'throw new Error("ENTRYPOINT_INPUT_INVALID: only nonempty task, workspaceId and baseRevision are accepted");') + "; the committed schema agrees: " + c(MW, "contracts/schemas/development-request.v1.schema.json", '"additionalProperties": false,'),
        "Pi's side of the same contract: " + c(PI, "src/workbench/execute.ts", 'const judged = (value: unknown): unknown => (kind === "function" ? withoutBeadsNotes(value) : value);') + "; " + d("pi-02-PROTOCOL-AND-RUNTIME.md", "3. Validate producer DevelopmentRequest shape (nonempty task, workspaceId, baseRevision; closed members). Bind workspaceId and baseRevision to host-measured workspace; refuse inconsistent caller values rather than overriding silently.") + "; " + d("pi-04-ADVERSARIAL-VERIFICATION.md", "| G08 | differing free-form Beads notes, identical typed input | identical admitted and dispatched canonical input, no note read |"),
    ]),
    "",
    "ESTABLISHED",
    NODRIFT,
    "The premise is true as written: the core request is three string members, develop() refuses an empty or non-string value with INVALID_DEVELOPMENT_REQUEST, and the core type is not closed at run time. NARROWER PROPOSITION, also established and useful to the joint contract: the installed host path is closed at run time, so an input with any fourth member is refused as ENTRYPOINT_INPUT_INVALID before the artifact is even hashed, and the committed request schema says additionalProperties false. For Pi's proposed closure (C098) and its note test G08 (C194) this is a producer-side backstop: a note member that survived Pi's stripping would be refused by the producer, not silently read. Two bounds: Beads notes are a Pi concept, so Mechanical has no note test and the 'no note read' half of G08 is checkable only in Pi; and the backstop sits in entrypoint-host behind invokeDevelopmentHost, so it carries over to the composed call only if that call keeps the same validation.",
)

row(
    ["C034", "C133", "C228", "C230", "C137"],
    "SUPPORTS",
    J([
        "Dependency direction, stated twice and true in code: " + d("pi-README.md", "never couple Mechanical core to Pi, never require Library for execution,") + "; " + d("mw-README.md", "No Pi import inside @mechanical/workflows-development; no Forge↔Furnace dependency; no Library runtime requirement; no requirement for HX task completeness or committed RF rendering in first Git/plain profile. Planning packet IDs are not Beads IDs.") + "; code witness in the C134 row",
        "Planning labels are not Beads ids, both sides: " + d("pi-README.md", "packet IDs in this program are *planning labels*, not fabricated bead IDs.") + "; " + d("mw-03-IMPLEMENTATION-PACKETS.md", "Labels H00–H12 are planning labels only."),
        "No nested develop inside implement, both sides: " + d("pi-05-OPERATIONS-AND-HANDOFF.md", "no nested developLive within implement callback.") + "; " + d("mw-02-HOST-AND-EFFECT-CONTRACT.md", "Must not call developLive() from inside implement(), as that would recursively run a second complete develop()."),
        "First release excludes HX/RF/Furnace and keeps Furnace opt-in, both sides: " + d("pi-README.md", "keep optional HX/RF/Furnace profiles outside the first Git/plain release.") + "; " + d("mw-05-OPERATIONS-AND-HANDOFF.md", "Optional Furnace owns explicit Run/Attempt; no Forge↔Furnace dependency. Beads issue identity is distinct from invocation identity.") + "; " + d("pi-03-IMPLEMENTATION-PACKETS.md", "No implicit Furnace dependency or shared fake invocation identity."),
        "Same red-first per-packet discipline: " + d("pi-03-IMPLEMENTATION-PACKETS.md", "**Every packet:** inspect exact current sources/Beads first; write a red behavior test and its negative mutant; implement minimal change; run focused suites and applicable local Forge full gate; capture command/exit/digest/native receipts; update docs/skills and actual status in the SAME implementation cut.") + "; " + d("mw-03-IMPLEMENTATION-PACKETS.md", "**Execution discipline:** re-pin both heads and actual Beads/feedback, write red test + falsifying mutant before implementation, implement minimal code, run focused test and relevant local full Forge gate, update README/docs/AGENTS/skill and source-pinned receipt in the same implementation cut. No GitHub CI."),
        "Same L2-is-not-L4 guard from both directions: " + d("pi-01-AUDIT-AND-INVARIANTS.md", "Do NOT conflate an independently installed Node consumer named pi-consumer with actual Pi tool execution.") + "; " + d("mw-04-VERIFICATION-AND-RELEASE.md", "| Q22 | Pi tool cannot reach host, while direct fixture succeeds | release veto; L2 remains L2 |"),
    ]),
    "",
    "NON-EPISTEMIC",
    NODRIFT,
    "FAILED ATTACK, preserved: the hypothesis that the two programs also disagree on their standing rules did not survive. The coherent core, recorded so the disagreement rows are not read as total incoherence: both programs agree on dependency direction, on packet ids being planning labels, on the no-nested-develop rule, on first-release profile exclusions with Furnace opt-in, on red-test-plus-mutant discipline with local Forge gates, and on refusing to count the installed fixture as a joined proof. The rules are normative, so the row is not graded as fact; what the quotations show is that the two programs state the same rule in each case and that the code witnesses match where code exists. These shared sentences are one authoring lineage (same author, same evening), so the agreement is consistency, not independent corroboration.",
)

with open(PINS + PI + "/.github/workflows/ci.yml", encoding="utf-8") as _h:
    _ci = _h.read()
assert "node-version: 22" in _ci
assert not os.path.exists(PINS + MW + "/.github")

row(
    ["C138"],
    "CONTRADICTS",
    J([
        "One sentence on both sides: " + d("pi-README.md", "No GitHub CI. Use focused local tests, complete Forge gate where available, exact source pins and machine-readable producer receipts.") + "; " + d("mw-README.md", "No GitHub CI, no Fabricated PASS, no unverified test claims.") + "; " + d("mw-05-OPERATIONS-AND-HANDOFF.md", "push carefully to the default branch once source is reconciled. No GitHub CI."),
        "Repo states diverge: MW has no .github directory at 69cb016d (os.path check asserted by this generator); Pi at 0fb90672 has .github/workflows/ci.yml running npm ci, lint, typecheck and test on push/pull_request to master, on node-version 22 (asserted), against engines " + c(PI, "package.json", '"node": ">=24"'),
    ]),
    "Directory existence check on the two pinned worktrees and a read of Pi's ci.yml. Power: complete for committed GitHub workflow definitions at the pins.",
    "REFUTED",
    NODRIFT,
    "Graded on the descriptive reading that C138 states, the Pi repository has no GitHub CI: refuted at the pin, one-sidedly, by the committed workflow, which runs lint, typecheck and the test script on push and pull request, on a Node major that the package engines field excludes. The joint lens adds that the identical sentence is true as a repository description on the Mechanical side, which has no .github directory, so the same four words carry two different truth values across the pair. Read as a constraint (CI runs are not acceptance evidence; use local gates and receipts) the sentence is coherent on both sides, matches the per-packet discipline both programs share, and belongs to the normative row C034, which stays NON-EPISTEMIC. The Pi corpus never discloses that the workflow exists. Remediation DOWNGRADE_MODALITY on the Pi side: say that a ci.yml exists and that its runs do not count as evidence for this program.",
)

# ---------------------------------------------------------------------------------------------
# Writer
# ---------------------------------------------------------------------------------------------
OUT = WORK + "lens-joint.jsonl"
with open(OUT, "w", encoding="utf-8") as handle:
    for entry in ROWS:
        handle.write(json.dumps(entry, ensure_ascii=False) + "\n")
print("wrote %s rows=%d" % (OUT, len(ROWS)))
