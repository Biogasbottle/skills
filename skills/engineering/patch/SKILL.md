---
name: patch
description: Propose and optionally apply distilled project memory updates after meaningful work. Use when the user asks for memory patching, session wrap-up, handoff, recording lessons, updating project memory, or when finishing substantial coding/debugging/design work that may change long-term project knowledge.
---

# Memory Patch

Turn completed work into durable, low-noise project memory. Prefer a proposal first; apply edits only when the user explicitly asks to apply/write/update memory.

## Quick Start

1. Check whether the repo has `docs/agents/memory-patch.md`.
2. If present, use that template. If absent, use the fallback structure below.
3. Inspect only relevant artifacts: changed files, final diff, existing `CONTEXT.md`, `docs/adr/`, `docs/`, and `docs/handoff/`.
4. Produce a concise memory patch proposal, grouped by target file.
5. Ask for confirmation before editing long-term memory files.

## When To Propose

Propose a memory patch when work creates or changes:

- stable domain language, invariants, or business rules;
- architecture decisions or rejected alternatives;
- flow behavior, state transitions, side effects, or known risks;
- platform gotchas or debugging lessons;
- coding conventions shared across tools;
- short-term continuation context for a future session.

Skip it for tiny typo fixes, formatting-only changes, throwaway experiments, or facts already captured cleanly in committed docs.

## Target Routing

- `CONTEXT.md`: stable domain terms, relationships, naming ambiguities.
- `docs/adr/`: architecture decisions, rejected alternatives, consequences.
- `docs/architecture/`: system navigation or module relationships.
- `docs/conventions/`: shared coding and collaboration rules.
- `docs/flows/`: distilled business flow knowledge.
- `docs/gotchas/`: platform limitations, recurring pitfalls, safe handling.
- `docs/handoff/current.md`: local, short-term, branch/session continuation notes.

Do not duplicate long reports. Link to `docs/`, `e2e-flows/`, tests, commits, or PRs when they already contain detail.

## Proposal Format

If the repo template exists, follow it. Otherwise use:

```md
## Memory Patch Proposal

### Long-Term Updates

- Target: `path/to/file.md`
- Change: ...
- Why durable: ...

### Short-Term Handoff

- Target: `docs/handoff/current.md`
- Current state: ...
- Next action: ...
- Blockers: ...

### Privacy Check

- No real phone numbers, openids, unionids, counseling content, assessment answers, payment secrets, production keys, or raw production logs.
```

## Apply Rules

- Default mode is proposal-only.
- Before editing, confirm the exact target files unless the user already said to apply the patch.
- Keep edits small and distilled. Do not paste chat transcripts.
- Do not overwrite unrelated memory or user edits.
- Use repo facts over memory guesses; mark uncertain items as questions instead of saving them.

## Privacy Boundary

Never save real user identifiers, counseling content, assessment answers, payment secrets, production keys, or raw production logs. Store only structure, rules, decisions, constraints, risks, and sanitized engineering facts.
