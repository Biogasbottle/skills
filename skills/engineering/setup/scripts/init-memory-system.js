#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = process.argv[2];

if (!repoRoot) {
  console.error('Usage: node init-memory-system.js /absolute/path/to/repo');
  process.exit(1);
}

const root = path.resolve(repoRoot);

if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error(`Target is not a directory: ${root}`);
  process.exit(1);
}

const dirs = [
  'docs/agents',
  'docs/adr',
  'docs/prd',
  'docs/architecture',
  'docs/conventions',
  'docs/flows',
  'docs/gotchas',
  'docs/handoff',
];

const files = {
  'docs/INDEX.md': `# Project Memory Index

This directory is the repo-first engineering memory layer. Its goal is to let future sessions, IDEs, and LLMs recover project context with low token cost.

## Loading Strategy

Do not read the whole repository by default. Load the smallest useful context for the task:

| Current task | Read first |
| --- | --- |
| Any new session | \`CLAUDE.md\` / \`AGENTS.md\`, this file, \`README.md\` |
| Domain terms / business naming | \`CONTEXT.md\` |
| Architecture tradeoffs / rejected approaches | \`docs/adr/\` |
| System structure / module navigation | \`docs/architecture/\` |
| Coding conventions | \`docs/conventions/\` |
| Business flows | \`docs/flows/\` |
| Platform limits / historical gotchas | \`docs/gotchas/\` |
| Current unfinished work | \`docs/handoff/current.md\` |
| Issue tracker config | \`docs/agents/issue-tracker.md\` |

## Memory Layers

- \`CONTEXT.md\`: domain language and stable concepts; keep it short.
- \`docs/adr/\`: architecture decisions with chosen / rejected / consequences.
- \`docs/prd/\`: product requirements and long-lived specs.
- \`docs/architecture/\`: system navigation and module relationships.
- \`docs/conventions/\`: shared coding and collaboration rules.
- \`docs/flows/\`: distilled business process knowledge.
- \`docs/gotchas/\`: platform limitations and risky boundaries.
- \`docs/agents/\`: runtime configuration (issue tracker, triage labels, domain rules) and templates.
- \`docs/handoff/\`: local short-term working context; usually gitignored.

## Update Discipline

After completing work with memory value, extract only stable facts:

- New domain terms: update \`CONTEXT.md\`.
- New architecture decisions: add \`docs/adr/NNNN-short-title.md\`.
- New flow knowledge: update \`docs/flows/*.md\`.
- New platform gotchas: update \`docs/gotchas/*.md\`.
- Temporary TODOs or branch state: update \`docs/handoff/current.md\`.
- Unsure whether something belongs in long-term memory: propose via \`docs/agents/memory-patch.md\`.

Do not save chat transcripts, unverified guesses, real private data, or fast-expiring command output.
`,
  'docs/agents/memory-patch.md': `# Memory Patch Proposal

## Summary

- What stable fact changed?

## Proposed updates

- \`CONTEXT.md\`:
- \`docs/adr/\`:
- \`docs/architecture/\`:
- \`docs/conventions/\`:
- \`docs/flows/\`:
- \`docs/gotchas/\`:

## Privacy check

- [ ] Contains no real private user data
- [ ] Contains no production secrets
- [ ] Logs or identifiers are sanitized

## Open questions

- What still needs human confirmation?
`,
  'docs/adr/0000-template.md': `# ADR 0000: Template

## Status

Proposed

## Context

What problem or tradeoff is being decided?

## Decision

What option was chosen?

## Rejected options

- Option:
  - Why rejected:

## Consequences

- Positive:
- Negative:
- Follow-up:
`,
  'docs/handoff/current.md': `# Current Handoff

Local short-term context for unfinished work. This file may be gitignored and should not replace long-term memory.

## Current task

-

## Relevant files

-

## Decisions made

-

## Next steps

-
`,
  'CONTEXT.md': `# Project Context

This file defines stable domain language for the project. Keep it concise.

## Language

### Core domain

**TermName**:
Definition and expected usage.
_Avoid_: old names or ambiguous alternatives.

## Relationships

- Describe stable relationships between core domain entities.

## Example dialogue

> **Dev**: Add a realistic question that future agents may ask.
> **Domain expert**: Answer using the project language above.

## Flagged ambiguities

- Track naming collisions, legacy terms, and overloaded concepts here.
`,
};

const created = [];
const skipped = [];

for (const dir of dirs) {
  const fullPath = path.join(root, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    created.push(dir + path.sep);
  }
}

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(root, relativePath);
  if (fs.existsSync(fullPath)) {
    skipped.push(relativePath);
    continue;
  }

  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  created.push(relativePath);
}

console.log('Memory system initialization complete.');
console.log(`Target: ${root}`);
console.log('Created:');
for (const item of created) console.log(`- ${item}`);
console.log('Skipped existing files:');
for (const item of skipped) console.log(`- ${item}`);
