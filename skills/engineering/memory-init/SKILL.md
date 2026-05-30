---
name: memory-init
description: Initializes a repo-first Markdown memory system with AGENTS.md, CONTEXT.md, project-memory, ADR, PRD, and handoff conventions for a codebase. Use when the user asks to set up project memory, initialize repo memory architecture, create AGENTS.md/CONTEXT.md/project-memory, or apply a cloud-mini-style memory system to a new project.
---

# Memory Init

## Purpose

Set up a repo-first memory system for a project so future agents can recover context cheaply and consistently.

The repository Markdown files are the source of truth. IDE rules, vector indexes, MCP memories, and external memory services may consume these files, but must not become the only source of project knowledge.

## Quick start

1. Inspect the target repo before writing anything:
   - Existing `AGENTS.md`, `CONTEXT.md`, `README.md`
   - Existing docs directories such as `docs/adr/`, `docs/prd/`, `project-memory/`
   - Existing privacy or contribution rules
2. If the user wants automatic scaffolding, run the bundled script:

```bash
node /path/to/memory-init/scripts/init-memory-system.js /absolute/path/to/repo
```

3. Customize the generated placeholders to the project domain.
4. Do not overwrite existing memory files unless the user explicitly asks for migration or replacement.

## Memory architecture

Create or preserve these layers:

- `AGENTS.md`: minimal boot protocol for all coding agents.
- `CONTEXT.md`: stable domain language, relationships, and naming ambiguities.
- `docs/adr/`: architectural decisions, rejected options, and consequences.
- `docs/prd/`: product requirements and long-lived specs.
- `project-memory/INDEX.md`: loading strategy and memory ownership map.
- `project-memory/architecture/`: system navigation and module relationships.
- `project-memory/conventions/`: coding, collaboration, testing, and review rules.
- `project-memory/flows/`: distilled business process knowledge.
- `project-memory/gotchas/`: platform limitations, historical pitfalls, risky boundaries.
- `project-memory/templates/`: templates for future memory updates.
- `handoff/current.md`: local short-term working context; usually gitignored.

## Boot protocol to install

`AGENTS.md` should tell every agent:

1. Read `project-memory/INDEX.md` first, then load only task-relevant memory.
2. Read `CONTEXT.md` for domain language, business concepts, and naming ambiguity.
3. Read `docs/adr/` for architectural tradeoffs and rejected approaches.
4. Read `project-memory/flows/` for end-to-end business processes.
5. Keep Markdown in the repo as the memory source of truth.

## Ownership rules

When updating memory, route facts by ownership:

- Stable domain terms, relationships, ambiguity: `CONTEXT.md`
- Architecture decisions: `docs/adr/NNNN-short-title.md`
- Product requirements: `docs/prd/`
- System/module navigation: `project-memory/architecture/`
- Coding and collaboration conventions: `project-memory/conventions/`
- Business flow knowledge: `project-memory/flows/`
- Gotchas and platform constraints: `project-memory/gotchas/`
- Temporary branch/session state: `handoff/current.md`
- Uncertain memory proposals: `project-memory/templates/memory-patch.md`

## Privacy boundary

Never write real private data to project memory: phone numbers, user IDs, raw user content, payment-sensitive data, production secrets, or unsanitized logs.

Only store structures, rules, decisions, constraints, risks, and sanitized engineering facts. If sensitive data must be mentioned, mask it before writing.

## Migration workflow

When applying this to an existing repo:

1. Preserve existing docs and agent rules.
2. Add missing layers incrementally.
3. Merge existing domain glossary into `CONTEXT.md`.
4. Convert long-lived decisions into ADRs instead of burying them in chat summaries.
5. Move temporary TODOs into `handoff/current.md`, not long-term memory.
6. End by updating `project-memory/INDEX.md` with repo-specific loading guidance.

## Done criteria

- `AGENTS.md` has a clear boot protocol and privacy boundary.
- `CONTEXT.md` contains project-specific domain language placeholders or real terms.
- `project-memory/INDEX.md` explains what to load for common task types.
- Core memory directories exist.
- Existing user content was not overwritten accidentally.
