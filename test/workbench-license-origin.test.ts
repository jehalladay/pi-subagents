/**
 * W22 / docs-17 release checklist item 1 (wb-cax.21): upstream license and
 * fork-origin preservation census.
 *
 * docs/workbench/17-packaging-and-operations.md "## Release checklist" item 1
 * requires "Sources and upstream license preserved; fork origin recorded."
 * docs/workbench/12-security.md "Supply chain" requires "Keep upstream MIT
 * notices and original fork history." This census pins the CONTENT of the four
 * records that carry those promises, from source reads only (no npm pack, no
 * network): LICENSE, package.json "license", the docs/17 "Development workspace"
 * fork-origin sentence, the docs/16 "Upstream maintainability" notice, and the
 * LICENSE entry of the package-smoke packed-path assertion.
 *
 * Every rule is a pure function over the file texts, so the mutation table below
 * proves each rule goes red on an in-memory mutant and names the file and the
 * expected line or sentence. Package identity fields (name, repository, author)
 * are an owner release decision and are deliberately not asserted here.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const LICENSE_PATH = "LICENSE";
const PACKAGE_PATH = "package.json";
const DOCS_17_PATH = "docs/workbench/17-packaging-and-operations.md";
const DOCS_16_PATH = "docs/workbench/16-repository-refactor.md";
const SMOKE_PATH = "qa/workbench/package-smoke.mjs";

const MIT_HEADING = "MIT License";
const COPYRIGHT_LINE = "Copyright (c) 2026 tintinweb";
const PERMISSION_SENTENCE = "Permission is hereby granted, free of charge, to any person obtaining a copy";
const FORK_ORIGIN_SENTENCE = "Fork remains jehalladay/pi-subagents based on tintinweb/pi-subagents, MIT.";
const UPSTREAM_NOTICE = "Preserve MIT copyright, license and original contributors.";

interface Sources {
  readonly license: string;
  readonly packageJson: string;
  readonly docs17: string;
  readonly docs16: string;
  readonly packageSmoke: string;
}

function readSources(): Sources {
  const read = (path: string): string => readFileSync(join(ROOT, path), "utf8");
  return {
    license: read(LICENSE_PATH),
    packageJson: read(PACKAGE_PATH),
    docs17: read(DOCS_17_PATH),
    docs16: read(DOCS_16_PATH),
    packageSmoke: read(SMOKE_PATH),
  };
}

/** Return the body of the "## <title>" section, up to the next "## " heading, or undefined. */
function sectionBody(markdown: string, title: string): string | undefined {
  const lines = markdown.split("\n");
  const start = lines.findIndex((line) => line.trimEnd() === `## ${title}`);
  if (start < 0) return undefined;
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((line) => line.startsWith("## "));
  return (end < 0 ? rest : rest.slice(0, end)).join("\n");
}

function expectSentence(failures: string[], path: string, where: string, body: string | undefined, sentence: string): void {
  if (body === undefined) {
    failures.push(`${path}: section "${where}" is missing; expected the line: ${sentence}`);
    return;
  }
  if (!body.includes(sentence)) failures.push(`${path}: section "${where}" no longer contains: ${sentence}`);
}

/** Every failure names the file and the line or sentence expected. */
function licenseOriginFailures(sources: Sources): string[] {
  const failures: string[] = [];

  const licenseLines = sources.license.split("\n");
  if (licenseLines[0]?.trim() !== MIT_HEADING) failures.push(`${LICENSE_PATH}:1: expected the heading line: ${MIT_HEADING}`);
  if (!licenseLines.some((line) => line.trim() === COPYRIGHT_LINE)) {
    failures.push(`${LICENSE_PATH}:3: expected the original copyright-holder line: ${COPYRIGHT_LINE}`);
  }
  if (!sources.license.includes(PERMISSION_SENTENCE)) {
    failures.push(`${LICENSE_PATH}:5: expected the MIT permission sentence: ${PERMISSION_SENTENCE}`);
  }

  try {
    const parsed: unknown = JSON.parse(sources.packageJson);
    const license = typeof parsed === "object" && parsed !== null ? (parsed as { license?: unknown }).license : undefined;
    if (license !== "MIT") failures.push(`${PACKAGE_PATH}: expected "license": "MIT", found ${JSON.stringify(license)}`);
  } catch {
    failures.push(`${PACKAGE_PATH}: not parseable JSON; expected "license": "MIT"`);
  }

  expectSentence(failures, DOCS_17_PATH, "Development workspace", sectionBody(sources.docs17, "Development workspace"), FORK_ORIGIN_SENTENCE);
  expectSentence(failures, DOCS_16_PATH, "Upstream maintainability", sectionBody(sources.docs16, "Upstream maintainability"), UPSTREAM_NOTICE);

  const smokeLines = sources.packageSmoke.split("\n");
  const assertsPackedNames = smokeLines.some((line) => /for \(const name of \[/.test(line) && /['"]LICENSE['"]/.test(line) && /names\.includes\(name\)/.test(line));
  if (!assertsPackedNames) {
    failures.push(`${SMOKE_PATH}: expected a packed-path assertion that lists 'LICENSE' and checks names.includes(name)`);
  }

  return failures;
}

describe("wb-cax.21 upstream license and fork-origin preservation census", () => {
  it("passes against the committed tree", () => {
    expect(licenseOriginFailures(readSources())).toEqual([]);
  });

  interface Mutant {
    readonly name: string;
    readonly mutate: (sources: Sources) => Sources;
    readonly expected: string;
  }

  const mutants: readonly Mutant[] = [
    {
      name: "LICENSE loses the MIT heading",
      mutate: (s) => ({ ...s, license: s.license.replace(MIT_HEADING, "Apache License") }),
      expected: `${LICENSE_PATH}:1: expected the heading line: ${MIT_HEADING}`,
    },
    {
      name: "LICENSE loses the original copyright-holder line",
      mutate: (s) => ({ ...s, license: s.license.replace(COPYRIGHT_LINE, "Copyright (c) 2026 someone else") }),
      expected: `${LICENSE_PATH}:3: expected the original copyright-holder line: ${COPYRIGHT_LINE}`,
    },
    {
      name: "LICENSE loses the MIT permission sentence",
      mutate: (s) => ({ ...s, license: s.license.replace(PERMISSION_SENTENCE, "All rights reserved.") }),
      expected: `${LICENSE_PATH}:5: expected the MIT permission sentence: ${PERMISSION_SENTENCE}`,
    },
    {
      name: 'package.json license is not "MIT"',
      mutate: (s) => ({ ...s, packageJson: s.packageJson.replace('"license": "MIT"', '"license": "UNLICENSED"') }),
      expected: `${PACKAGE_PATH}: expected "license": "MIT", found "UNLICENSED"`,
    },
    {
      name: "package.json is unparseable",
      mutate: (s) => ({ ...s, packageJson: "{" }),
      expected: `${PACKAGE_PATH}: not parseable JSON; expected "license": "MIT"`,
    },
    {
      name: "docs/17 loses the fork-origin sentence",
      mutate: (s) => ({ ...s, docs17: s.docs17.replace(FORK_ORIGIN_SENTENCE, "Fork origin omitted.") }),
      expected: `${DOCS_17_PATH}: section "Development workspace" no longer contains: ${FORK_ORIGIN_SENTENCE}`,
    },
    {
      name: "docs/17 fork-origin sentence moves outside the Development workspace section",
      mutate: (s) => ({
        ...s,
        docs17: `${s.docs17.replace(FORK_ORIGIN_SENTENCE, "")}\n## Appendix\n${FORK_ORIGIN_SENTENCE}\n`,
      }),
      expected: `${DOCS_17_PATH}: section "Development workspace" no longer contains: ${FORK_ORIGIN_SENTENCE}`,
    },
    {
      name: "docs/17 loses the Development workspace section",
      mutate: (s) => ({ ...s, docs17: s.docs17.replace("## Development workspace", "## Workspace") }),
      expected: `${DOCS_17_PATH}: section "Development workspace" is missing; expected the line: ${FORK_ORIGIN_SENTENCE}`,
    },
    {
      name: "docs/16 loses the upstream-maintainability notice",
      mutate: (s) => ({ ...s, docs16: s.docs16.replace(UPSTREAM_NOTICE, "Notices are optional.") }),
      expected: `${DOCS_16_PATH}: section "Upstream maintainability" no longer contains: ${UPSTREAM_NOTICE}`,
    },
    {
      name: "package-smoke stops listing LICENSE among packed paths",
      mutate: (s) => ({ ...s, packageSmoke: s.packageSmoke.replace(/['"]LICENSE['"],?/, "") }),
      expected: `${SMOKE_PATH}: expected a packed-path assertion that lists 'LICENSE' and checks names.includes(name)`,
    },
  ];

  it.each(mutants)("goes red and names the record when: $name", ({ mutate, expected }) => {
    const baseline = readSources();
    const mutated = mutate(baseline);
    expect(mutated).not.toEqual(baseline);
    expect(licenseOriginFailures(mutated)).toContain(expected);
  });
});
