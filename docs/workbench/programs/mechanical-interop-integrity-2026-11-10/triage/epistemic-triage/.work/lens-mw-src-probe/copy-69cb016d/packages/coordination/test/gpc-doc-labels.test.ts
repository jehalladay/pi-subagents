// MechanicalWorkflows-w90b (GPC-EAT-R014): every pipeline, feedback, vertical-cut and acceptance
// statement in the two GPC program documents carries an explicit CURRENT or TARGET label (the APO
// convention), synthetic and real claims sit in separate sentences, and the vacuous 'coordinator
// runtime requirements' clause stays removed. The guard reads the committed documents; it pins
// labelling fail-closed so an unlabeled statement cannot land silently.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const overviewPath = join(here, "../../../docs/programs/graph-policy-coordination-2026-10-18.md");
const readmePath = join(here, "../../../docs/programs/graph-policy-coordination-2026-10-18/README.md");
const docs: readonly [string, string][] = [
  ["overview", readFileSync(overviewPath, "utf8")],
  ["README", readFileSync(readmePath, "utf8")],
];

const GUARDED = /pipeline|feedback|vertical cut|acceptance|experiments/i;
/** Sections where the acceptance demands SENTENCE granularity; elsewhere a labeled line suffices. */
const SENTENCE_SECTIONS = /feedback|vertical cut/i;

/** Split a paragraph into sentences, keeping inline code and parentheticals intact enough for the label check. */
function sentencesOf(paragraph: string): string[] {
  return paragraph.split(/(?<=[.!?])\s+(?=[A-Z`'])/).map(part => part.trim()).filter(part => part.length > 0);
}

/** The statement units of a section body: numbered steps and paragraph lines, headings excluded. */
function statements(body: string, sentenceLevel: boolean): string[] {
  const lines = body
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0 && !line.startsWith("#"));
  return sentenceLevel ? lines.flatMap(sentencesOf) : lines;
}

function sections(text: string): [string, string][] {
  const parts = text.split(/^## /m).slice(1);
  return parts.map(part => {
    const [title, ...rest] = part.split("\n");
    return [title!.trim(), rest.join("\n")];
  });
}

test("every statement of every guarded section carries an explicit CURRENT or TARGET label", () => {
  let checked = 0;
  for (const [name, text] of docs) {
    for (const [title, body] of sections(text)) {
      if (!GUARDED.test(title)) continue;
      for (const statement of statements(body, SENTENCE_SECTIONS.test(title))) {
        checked += 1;
        assert.ok(/CURRENT|TARGET/.test(statement), `${name} / ${title}: unlabeled statement: ${statement.slice(0, 120)}`);
      }
    }
  }
  assert.ok(checked >= 10, `the guard actually read statements (checked ${checked})`);
});

test("synthetic and real claims sit in separate sentences: no sentence mixes a synthetic marker with a live/real claim", () => {
  for (const [name, text] of docs) {
    const sentences = text.split(/(?<=[.!?])\s+/);
    for (const sentence of sentences) {
      const synthetic = /\bsynthetic\b/i.test(sentence);
      const real = /\blive\b|\breal\b/i.test(sentence);
      if (synthetic && real) {
        // The one allowed shape is an explicit separation instruction, not a mixed claim.
        assert.ok(/separately|separate sentences|never as/.test(sentence), `${name}: sentence mixes synthetic and live claims: ${sentence.slice(0, 140)}`);
      }
    }
  }
});

test("the vacuous 'coordinator runtime requirements' clause stays removed from both documents", () => {
  for (const [name, text] of docs) {
    assert.equal(/coordinator runtime requirements/i.test(text), false, name);
  }
});

test("the labels are the APO convention: both documents use CURRENT and TARGET as whole-word markers, never lowercase variants", () => {
  for (const [name, text] of docs) {
    assert.ok(/\bCURRENT\b/.test(text) && /\bTARGET\b/.test(text), `${name} uses both markers`);
    assert.equal(/\bCurrent:\b|\bTarget:\b/.test(text), false, `${name} has no mixed-case marker variants`);
  }
});

// MechanicalWorkflows-5dqx: nine laws the four tests above leave unpinned at the landed w90b tree.
// Each block below kills one single-line document mutant (S1 to S9 of the 06-aup lead) that the
// original guard accepts. The documents stay byte-identical; only these checks are new.

/** Whole-document sentence units, split after any of . ! ? followed by whitespace, whatever the next character is. */
function strictSentencesOf(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map(part => part.replace(/\s+/g, " ").trim())
    .filter(part => part.length > 0);
}

/** Innermost parenthetical groups of a text (no nested parentheses inside the group). */
function innermostParentheticals(text: string): string[] {
  return [...text.matchAll(/\(([^()]*)\)/g)].map(match => match[1]!);
}

const LANDED_SEPARATION_INSTRUCTION = "Document synthetic vs real claims separately, in separate sentences (CURRENT convention).";
const LANDED_GUARDED_TITLES: Record<string, readonly string[]> = {
  overview: ["Proposal pipeline", "Experiments and falsifiers"],
  README: ["Ownership and decision pipeline", "Feedback", "First vertical cut", "Acceptance"],
};

test("P1 a CURRENT label never sits in a parenthetical that asserts the thing does not exist", () => {
  const nonexistence = /\bno such\b|\b(?:does|do) not exist\b|\bno implementation exists\b|\bunbuilt\b|\bnot (?:yet )?built\b/i;
  let currentGroups = 0;
  for (const [name, text] of docs) {
    for (const group of innermostParentheticals(text)) {
      if (!/\bCURRENT\b/.test(group)) continue;
      currentGroups += 1;
      assert.equal(nonexistence.test(group), false, `${name}: CURRENT label contradicts its own clause: (${group.slice(0, 120)})`);
    }
  }
  assert.ok(currentGroups >= 5, `the guard actually read CURRENT parentheticals (checked ${currentGroups})`);
});

test("P2 the guarded section titles of each document equal the landed list, so a retitle fails instead of unguarding", () => {
  for (const [name, text] of docs) {
    const guarded = sections(text).map(([title]) => title).filter(title => GUARDED.test(title));
    assert.deepEqual(guarded, LANDED_GUARDED_TITLES[name], `${name}: guarded section titles changed`);
  }
});

test("P3 sentence-level sections split after any sentence end: every fragment carries a label whatever character opens it", () => {
  let checked = 0;
  for (const [name, text] of docs) {
    for (const [title, body] of sections(text)) {
      if (!SENTENCE_SECTIONS.test(title)) continue;
      for (const line of body.split("\n").map(entry => entry.trim()).filter(entry => entry.length > 0 && !entry.startsWith("#"))) {
        for (const sentence of strictSentencesOf(line)) {
          checked += 1;
          assert.ok(/\b(?:CURRENT|TARGET)\b/.test(sentence), `${name} / ${title}: unlabeled sentence fragment: ${sentence.slice(0, 120)}`);
        }
      }
    }
  }
  assert.ok(checked >= 6, `the strict splitter actually read sentences (checked ${checked})`);
});

test("P4 the only sentence that mixes a synthetic and a live/real marker is the landed separation instruction", () => {
  const mixed: string[] = [];
  for (const [, text] of docs) {
    for (const sentence of strictSentencesOf(text)) {
      if (/\bsynthetic\b/i.test(sentence) && /\blive\b|\breal\b/i.test(sentence)) mixed.push(sentence);
    }
  }
  assert.deepEqual(mixed, [LANDED_SEPARATION_INSTRUCTION]);
});

test("P5 the synthetic marker matches inflected stems, so 'synthetically generated' cannot hide a mixed claim", () => {
  const mixed: string[] = [];
  for (const [, text] of docs) {
    for (const sentence of strictSentencesOf(text)) {
      if (/\bsynthetic\w*/i.test(sentence) && /\blive\b|\breal\b/i.test(sentence)) mixed.push(sentence);
    }
  }
  assert.deepEqual(mixed, [LANDED_SEPARATION_INSTRUCTION]);
});

test("P6 the vacuous 'coordinator runtime requirements' clause stays removed under any whitespace, including a Markdown soft wrap", () => {
  for (const [name, text] of docs) {
    assert.equal(/coordinator\s+runtime\s+requirements/i.test(text), false, name);
  }
});

test("P7 no document uses a 'Current:' or 'Target:' mixed-case marker, with any character after the colon", () => {
  for (const [name, text] of docs) {
    assert.equal(/\b(?:Current|Target):/.test(text), false, `${name} has no mixed-case marker with a colon`);
  }
});

test("P8 no document uses a lowercase 'current:' or 'target:' marker", () => {
  for (const [name, text] of docs) {
    assert.equal(/\b(?:current|target):/.test(text), false, `${name} has no lowercase marker with a colon`);
  }
});

test("P9 every guarded statement carries CURRENT or TARGET as a whole word, never only inside an identifier such as GP_TARGET_UNBUILT", () => {
  let checked = 0;
  for (const [name, text] of docs) {
    for (const [title, body] of sections(text)) {
      if (!GUARDED.test(title)) continue;
      for (const statement of statements(body, SENTENCE_SECTIONS.test(title))) {
        checked += 1;
        assert.ok(/\bCURRENT\b|\bTARGET\b/.test(statement), `${name} / ${title}: no whole-word label: ${statement.slice(0, 120)}`);
      }
    }
  }
  assert.ok(checked >= 10, `the guard actually read statements (checked ${checked})`);
});
