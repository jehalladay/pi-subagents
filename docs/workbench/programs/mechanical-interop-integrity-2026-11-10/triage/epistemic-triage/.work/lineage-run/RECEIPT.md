# lineage lens census receipts (2026-11-11), scratch copies via git archive + node_modules symlink from PrimaryInstallation (package-lock blob 230e53c2 identical at all three trees), node v24.20.0, CI=1, env -u CLAUDECODE
# command: npx vitest run test/workbench-mwi-docs-remediation-census.test.ts --reporter=dot
## ce180d82
 Test Files  1 passed (1)
      Tests  126 passed (126)
## 0fb90672
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 4 ⎯⎯⎯⎯⎯⎯⎯
 Test Files  1 failed (1)
      Tests  4 failed | 122 passed (126)
   AssertionError: the live page: expected [ 'M049 stands 0 times' ] to deeply equal []
   AssertionError: the live page: expected [ 'M050 stands 0 times' ] to deeply equal []
   AssertionError: M050 quiet: expected [ 'M050 stands 0 times' ] to deeply equal []
   AssertionError: expected [ 'M001', 'M002', 'M003', …(45) ] to deeply equal [ 'M001', 'M002', 'M003', …(47) ]
## 3fc0ead1
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 8 ⎯⎯⎯⎯⎯⎯⎯
 Test Files  1 failed (1)
      Tests  8 failed | 118 passed (126)
   AssertionError: SKILL + an HTML block (a comment on its own line): expected [ 'M048 stands at SKILL:L17', …(1) ] to deeply equal [ 'M048 page SKILL holds html' ]
   AssertionError: SKILL + U+0009 in a angle-bracket destination, between two words: expected [ 'M048 stands at SKILL:L17', …(1) ] to deeply equal [ Array(1) ]
   AssertionError: SKILL + a title in double quotes after a bare destination, on the destination's line: expected [ 'M048 stands at SKILL:L17', …(1) ] to deeply equal [ 'M048 page SKILL holds link title' ]
   AssertionError: the live page: expected [ 'M048 stands at SKILL:L17' ] to deeply equal []
   AssertionError: the live page: expected [ 'M049 stands 0 times' ] to deeply equal []
   AssertionError: the live page: expected [ 'M050 stands 0 times' ] to deeply equal []
   AssertionError: M050 quiet: expected [ 'M050 stands 0 times' ] to deeply equal []
   AssertionError: expected [ 'M001', 'M002', 'M003', …(44) ] to deeply equal [ 'M001', 'M002', 'M003', …(47) ]
