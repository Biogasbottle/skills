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
  'docs/adr',
  'docs/prd',
  'project-memory/architecture',
  'project-memory/conventions',
  'project-memory/flows',
  'project-memory/gotchas',
  'project-memory/templates',
  'handoff',
];

const files = {
  'AGENTS.md': `# AGENTS.md

This file is the minimal boot entry for AI coding agents entering this repository.

## Boot Protocol

1. Read [project-memory/INDEX.md](project-memory/INDEX.md) first, then load only task-relevant memory.
2. Read [CONTEXT.md](CONTEXT.md) for domain language, business concepts, and naming ambiguity.
3. Read [docs/adr/](docs/adr/) for architectural tradeoffs, behavior boundaries, and rejected approaches.
4. Read [project-memory/flows/](project-memory/flows/) for end-to-end business processes.

## Memory Ownership

Markdown files in this repo are the project memory source of truth. IDE rules, agent skills, vector indexes, MCP, and external memory services may consume these files, but should not become the only source of truth.

Update project memory by ownership:

- Stable domain terms / relationships / ambiguity: [CONTEXT.md](CONTEXT.md)
- Architecture decisions: [docs/adr/](docs/adr/)
- Product requirements: [docs/prd/](docs/prd/)
- System structure and module navigation: [project-memory/architecture/](project-memory/architecture/)
- Coding and collaboration conventions: [project-memory/conventions/](project-memory/conventions/)
- Business flow knowledge: [project-memory/flows/](project-memory/flows/)
- Gotchas and platform constraints: [project-memory/gotchas/](project-memory/gotchas/)
- Current unfinished context: local [handoff/current.md](handoff/current.md), usually gitignored
- Session-end memory update proposals: [project-memory/templates/memory-patch.md](project-memory/templates/memory-patch.md)

## Privacy Boundary

Do not write real private user data into memory, including phone numbers, user IDs, raw user content, payment-sensitive data, production secrets, or unsanitized logs.

Project memory should only store structures, rules, decisions, constraints, risks, and sanitized engineering facts.
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
  'project-memory/INDEX.md': `# Project Memory Index

This directory is the repo-first engineering memory layer. Its goal is to let future sessions, IDEs, and LLMs recover project context with low token cost.

## Loading Strategy

Do not read the whole repository by default. Load the smallest useful context for the task:

| Current task | Read first |
| --- | --- |
| Any new session | \`AGENTS.md\`, this file, \`README.md\` |
| Domain terms / business naming | \`CONTEXT.md\` |
| Architecture tradeoffs / rejected approaches | \`docs/adr/\` |
| System structure / module navigation | \`project-memory/architecture/\` |
| Coding conventions | \`project-memory/conventions/\` |
| Business flows | \`project-memory/flows/\` |
| Platform limits / historical gotchas | \`project-memory/gotchas/\` |
| Current unfinished work | local \`handoff/current.md\` |
| Session-end memory proposal | \`project-memory/templates/memory-patch.md\` |

## Memory Layers

- \`CONTEXT.md\`: domain language and stable concepts; keep it short.
- \`docs/adr/\`: architecture decisions with chosen / rejected / consequences.
- \`docs/prd/\`: product requirements and long-lived specs.
- \`project-memory/architecture/\`: system navigation and module relationships.
- \`project-memory/conventions/\`: shared coding and collaboration rules.
- \`project-memory/flows/\`: distilled business process knowledge.
- \`project-memory/gotchas/\`: platform limitations and risky boundaries.
- \`project-memory/templates/\`: templates for memory updates.
- \`handoff/\`: local short-term working context; usually gitignored.

## Update Discipline

After completing work with memory value, extract only stable facts:

- New domain terms: update \`CONTEXT.md\`.
- New architecture decisions: add \`docs/adr/NNNN-short-title.md\`.
- New flow knowledge: update \`project-memory/flows/*.md\`.
- New platform gotchas: update \`project-memory/gotchas/*.md\`.
- Temporary TODOs or branch state: update \`handoff/current.md\`.
- Unsure whether something belongs in long-term memory: propose via \`project-memory/templates/memory-patch.md\`.

Do not save chat transcripts, unverified guesses, real private data, or fast-expiring command output.
`,
  'project-memory/templates/memory-patch.md': `# Memory Patch Proposal

## Summary

- What stable fact changed?

## Proposed updates

- \`CONTEXT.md\`:
- \`docs/adr/\`:
- \`project-memory/architecture/\`:
- \`project-memory/conventions/\`:
- \`project-memory/flows/\`:
- \`project-memory/gotchas/\`:

## Privacy check

- [ ] Contains no real private user data
- [ ] Contains no production secrets
- [ ] Logs or identifiers are sanitized

## Open questions

- What still needs human confirmation?
`,
  'handoff/current.md': `# Current Handoff

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
