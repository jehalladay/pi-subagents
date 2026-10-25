# wb-atq9: R694 follow-up from wb-gxd7.5 landing 327: F1 coordinated hollows that remove the same member from the census AND its same-cut roster stay green at the pin, row, label, residual, resolve and vocab levels (CT6g-pin-P 51/51, CT6g-row-M 50/50, CT6g-row-D 50/50, CT6g-residual 50/50, CT6g-re... - F2 ride

## 2026-10-24 the provenance census judged set and vocabularies, anchored outside the census (wb-gxd7.5 gate F1 and F2)

- What binds here: test/workbench-gp-provenance-census.test.ts (the wb-gxd7.5 census) reads the two tables below through the shared docs reader of test/helpers/census.ts (docsSection and sectionTables). Every level-3 section of this receipt is a ledger section titled "FAMILY, wb-atq9 cut N", FAMILY one of Judged rows, Vocabularies, Removed rows and Removed vocabulary members; each renders exactly one table with its family's header and no HTML, and the cut numbers run from 1 without a gap.
- The ledger: a member is a judged row (TABLE/ID), its label and each of its pins, written as the first 16 hex digits of the SHA-256 the census roster test/fixtures/gp-provenance-roster.json holds for it, and each member of a census vocabulary, written the same way as the first 16 hex digits of its SHA-256 so this page spells no judged word. The census reads every cut in order: a member stands once a cut adds it and leaves only when a Removed table of a later cut names it (a Removed rows line names the row with the label digest or pin digests it removes; a Removed vocabulary members line names the vocabulary and its members), so a later table that restates the set without a member removes nothing. The census holds its judged set equal to the ledger both ways; the roster and the frozen-shape literal keep holding order and counts.
- Clauses (the wb-gxd7.5 gate's F2): the census reads the four acceptance clauses from wb-gxd7.5's row of the tracked bead export as the delimited clauses of the owner filing's Acceptance sentence, cut before each clause marker of the form "; (b) ", and holds them equal to its own clause by clause, each clause's SHA-256 pinned in the roster; a clause cut to its letter, or short of its closing reference, no longer passes as a substring of the notes.
- Residuals: every residual family the landed wb-gxd7.5 delivery note names on its RESIDUALS line stays a named residual of the census, read from that append-only delivered paragraph.
- Red first, measured on base e54d89c with the wb-gxd7.5 gate's own coordinated hollows (its anchors verbatim, each applied in place with the roster regenerated from the mutated census, then restored byte-identical): CT6g-pin-P, CT6g-row-M, CT6g-row-D, CT6g-residual, CT6g-resolve, CT6g-label, CT6g-vocab, CT6g-clause and CT6g-clause-min each read 0 failed there. With this cut each one reads failed: CT6g-pin-P 1, CT6g-row-M 1, CT6g-row-D 1, CT6g-residual 2 (the landed note case beside the receipt ledger), CT6g-resolve 1, CT6g-label 1, CT6g-vocab 2 (with the census's vocabulary frozen literal left as cut; 1 when that literal moves too), CT6g-clause 1 and CT6g-clause-min 1 (the bead case): the ledger kills every pin, row, label, residual, resolve and vocabulary level, and the bead export kills both clause levels. The same row hollow beside an appended entry whose cut-2 tables restate the set without its member stays red; beside an appended Removed rows table naming the member it reads green, the visible removal path.
- Non-claims: the ledger anchors membership, never order; the walk exclusions are anchored as members only, since no case reads them behaviourally; a coordinated edit of the census's ledger family names or follow-up id together with an appended section re-points the anchor, which takes a visible docs append. This cut changes no src file, and TRACEABILITY.md is frozen and untouched. The receipt records no revision: its tables were rendered from the census at this cut and stand append-only from here.

### Judged rows, wb-atq9 cut 1

| Row | Label | Pins |
| --- | --- | --- |
| PROVENANCE/P-ACCEPT | c7d9d71cf772ecab | 981471f2e997e632 b63e86f629baa8fd 79de0ab939dd4c7f |
| PROVENANCE/P-VERSION-LINE | 964492e21b8b7551 | 1ca7a65891de8e45 4d03c3716386fdd6 84463661e440fbdb 61182a4cba5b4ca6 |
| PROVENANCE/P-SOURCE-SHA | d77b8ef77987664c | 64dbc7915a115fd7 e75103567a25e459 a5cc80193da6d6f5 549e03b202e47a22 1ffd83c06f761f3c |
| PROVENANCE/P-ENTRY-SHA256 | 69aa011161422caa | 40ee0c0e07e2cd71 e045c66edd3ef2a2 725741347d0bce61 613e849b0446b0fb |
| PROVENANCE/P-NOT-A-RECORD | 34918ec791b41059 | 28744b3cb8757d66 ac5e9c781e654f14 db02351c0ae11f70 312480d1015f58bc |
| CAPABILITY/B-SERVED | ce6f1fbdec036221 | 8e22f6069fbd0877 6e1491c66c297a1d 47421f5032703988 10c9617efaa360ad 793b195be531d0d2 |
| CAPABILITY/B-REFUSED | 1c2c42afd0c46dc8 | 1c5d486351a183f5 2cd46f0d2bc8d024 0d8568b49e3b6e7a caa7663975bf132c |
| CAPABILITY/B-LISTED | 1a6d0221b1943d3b | 7c7de854cd5d53ce 814d1cc585ca7031 f97aa2a3edeafe30 61a421c622e2a125 0d6ed53c82cab093 c69695c21b1833eb be85eea929fa3bef 8718044542d66d65 1fe92e7b0cb8bc5e 21c6142a18191ab0 fbf987001db9d5e6 56f4885e61a3e23c 63cc6b164f085a74 75005c7edce45e2f 557a9a1b8296a543 f887dedb1c9b5042 fc63e1fbbc30b37d |
| CAPABILITY/B-UNLISTED | 4d01a96573ddd7cd | 7b33ffa37299d766 7e6ea969aad14566 7f5bc72858dd410e |
| CAPABILITY/B-PREREQUISITE | fe0b5211f3ab9da2 | ff9f4dc84ff8002d e6097da687b0b83b 50e86ea69f7f578c |
| CAPABILITY/B-PROSE-READER | 0ecaeafe9ea24492 | c85fd6298d2e6eb4 2b8d2980b913cc9d 4b2659c742b1e3b9 |
| CAPABILITY/B-VERSION-READER | 775ae9e42cc52bb5 | 1ff4a218a3940fbb 8805b34d135b9ba4 891fadc4203c84c9 |
| DOC_LINES/D-C1-VERSION | 09c2a896d3bcc5dd | c93f7a459d2bcb78 37de0eb92d0362bc 8de1a2a6f4e9d3e6 98d3d265995902a9 a1bdbbf2277daf86 7d5da8d1f2ab9b78 8f9def0090dd03d5 |
| DOC_LINES/D-C2-VERB | 6398392485b5f5ff | de06cca71b6010e3 fa8e8a5c8fbf8f9c 2f6daadd859531b5 33dac675de9ab2c9 1cdd4d6c7210ee7d |
| DOC_LINES/D-GROUNDED | 11df74f7579f3564 | 2a374649c62d7a11 67c4c88a5485da29 6193ca0d35b41d70 |
| DOC_LINES/D-QUIET | 1f15bcc1f5089a0c | 6139d7938ce8d49b 9180c94ad20b0e2e 73c62afb0bcf0a97 7e02b40cfddb3d2f f02a33651debcee3 |
| RECEIPT_MUTANTS/M-PIN-RECEIPT | 1adf2237096c1bfd | ceedcf4f91a8013a |
| RECEIPT_MUTANTS/M-EMPTY-EXACTNESS | 6ec3c07fbfbc9b5f | 276bb00725cfc386 |
| RECEIPT_MUTANTS/M-NO-ARGV | f3666fcc323254de | 23a6fd1ec8a8ea67 |
| RECEIPT_MUTANTS/M-HAND-WRITTEN | f395bc445c4b7dca | ec71d28de416e12f |
| RECEIPT_MUTANTS/M-NO-SEED | 4ea88dec7bf80e1e | d7c5c02bc782512a |
| RECEIPT_MUTANTS/M-VERSION-SHA | 36915447580fce9c | 7432c96b276037e5 |
| RECEIPT_MUTANTS/M-SHORT-SHA | 35fd3ad81b1aadc3 | 24a15b608e335569 |
| RECEIPT_MUTANTS/M-OTHER-ENTRY | 662f839675a042b1 | bd58e5cd7a62647f |
| RECEIPT_MUTANTS/M-EXTRA-FIELD | 3caa69409de360f6 | 5a44fb6490761d0a |
| RECEIPT_MUTANTS/M-SCHEMA | 1c496fdced797ccd | c41b65e06b139b81 |
| RECEIPT_MUTANTS/M-NOT-VALIDATED | bcb7ad241d2de844 | 9d35712d3959227e |
| RECEIPT_MUTANTS/M-REFUSED | 04ec41eb8a5737f3 | 22bd2257e26446e1 |
| RESOLVE/L-PINNED | 202235710bf218a0 | e78d6d28f57788bf |
| RESOLVE/L-OTHER-BUILD | c21044b5bf3c54c5 | 5a2d6720435c9d68 |
| RESOLVE/L-FIRST-WINS | 2fc54e341bdc47e8 | 1e4fb65b6ef597c5 |
| RESOLVE/L-NO-BINARY | abbafd6dfba0ee7d | 35562f4cf46c7cb1 |
| RESOLVE/L-NO-PATH | 2549645716cc9bad | 576bb39cd9381f95 |
| RESIDUALS/R-SPLIT-LINE | ae8d52f5ecef456d | bd5c128b17f4f3a2 102aeadcab1c38d5 |
| RESIDUALS/R-ENCODED | e5de24a11f8b858c | 303a937822020123 7068368e9a0e1425 |
| RESIDUALS/R-PARAPHRASE | 99c86dbf486791db | 02723adf015d2d9a 07298e46def43b9c |
| RESIDUALS/R-NON-MARKDOWN | 6d6dff4cdae7b6b0 | 4d2c1d1175243b82 |
| RESIDUALS/R-SHAPE-ONLY | 3e454f24f994bd84 | 442d72034dab6fe4 |
| RESIDUALS/R-LISTED-NOT-SERVED | 9ad39dd3968f762f | 9e6c759e6903cfb4 43723e79821794bf dad0a1cc4462d3bc |
| RESIDUALS/R-STATIC-RECEIPT | 3fac19b64532d250 | 09b38a71741845e7 ed207403b15f67ca |
| RESIDUALS/R-CAPTURE-REPLAY | 16a31473c4e0e930 | 83d79830f1d522a1 51d1ee7d84656564 |
| RESIDUALS/R-LEXICAL-GROUNDING | e7e80af21fc9981c | ed32c736dc88a7ee |
| RESIDUALS/R-JSONL | 69e5f4b7a064495b | 60f8fceeae2bbe05 |

### Vocabularies, wb-atq9 cut 1

| Vocabulary | Members |
| --- | --- |
| verdict words | 3c5ded654bea7f7f 05aca9d6bbc154f4 6842ca7df10554ec 17d50adca8e1dc3d f647d4a4f5b66434 8fe88bf015b53b37 0e9a00021fd17ef6 60945d49535300be 0bee0730a4f92127 37b322c559d476e5 ba691ba042bcedd9 ddd9818abacfde7a |
| verdict codes | 1dbad9c8d5707ead 8282430b9198c26f |
| capability nouns | 59abf7da4d604e95 efe77b201dc216c0 52630e4131f9862e c2fb788c7deedbea |
| revision keys | 79e6131568e03ad4 2c022713df3b93d0 2b214ddf33260165 5ca4f3850ccc331a 57659a156374e42b 9505cacb7c710ed1 |
| claim statuses | 56547a7cc8bbf46b d4010cacbafbb3d6 8fe88bf015b53b37 83c874d33e8bff73 83e2ca46bcab40aa |
| missing prerequisites | 460ee6aa3a803591 9a3a45d01531a20e |
| receipt fields | 7b9b0d82510b3f8c ba159dbf9d2f740f ae17bb2ef230c0a9 6c76d19ad35ef2bf 260f83a79a5da479 0b27c158feb36ab1 d776f804ff89373b 300c71d96c23e604 fcbb0b71c7618c47 29428e4f530f8c4f fd893336d225d55e 1c06771950cb2f31 af2bdbe1aa9b6ec1 df0ad6e43880f09c a6235752ef51e86c ed916476e5d36929 b314ae60cb741e69 |
| walk exclusions | 4d0a4dff1f762e59 dba27c31aad93578 bcae0416621b3db4 44575cf5b28512d7 c3a3091b9d32267d 8d0eee604c4b7645 |
