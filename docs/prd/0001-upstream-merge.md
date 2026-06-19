# PRD 0001: Merge Upstream Skills Refactor

## Status

Approved

## Summary

Merge upstream (mattpocock/skills v1.0.1) into fork (Biogasbottle/skills). 92 files, +2659/-1526 lines. Keep exactly one fork modification: add `## Key Constraints` to `domain-modeling/CONTEXT-FORMAT.md` to ensure conventions and gotchas remain discoverable.

## Decisions (from grilling session)

| # | Decision |
|---|----------|
| 1 | Merge strategy: hard merge (`git merge upstream/main`), accept upstream on all conflicts |
| 2 | Keep only CONTEXT-FORMAT.md modification. Discard all other fork changes (10 skill INDEX.md additions, boot protocol, setup/init-memory-system.js) |
| 3 | Reference style: hard-link (not full content merge). Keep conventions/gotchas files separate. |
| 4 | Scope: `docs/conventions/` + `docs/gotchas/` only |
| 5 | Phrasing: "When implementing or designing, always check" |
| 6 | Placement: after `## Language` section in `domain-modeling/CONTEXT-FORMAT.md` |
| 7 | Fenestra: no migration. Manually add Key Constraints to its CONTEXT.md. |

## Implementation Steps

1. `git merge upstream/main` — accept upstream on all conflicts, delete fork-only files
2. Edit `skills/engineering/domain-modeling/CONTEXT-FORMAT.md` — add Key Constraints section
3. Commit merge + modification
4. Push to origin

## Change Detail

### File: `skills/engineering/domain-modeling/CONTEXT-FORMAT.md`

Insert after `## Language` section:

```markdown
## Key Constraints

When implementing or designing, always check (if these files exist):
- `docs/conventions/` — coding patterns, naming, test rules
- `docs/gotchas/` — known traps and fixes
```

## Risks

- Merge conflicts expected on files both fork and upstream modified (tdd, triage, to-issues, to-prd, grill-with-docs, prototype, handoff, zoom-out, grill-me, setup, diagnose, patch, design-plan, caveman, write-a-skill) — resolve by accepting upstream
- Fenestra's 42 memory documents remain compatible (keep all directories, add Key Constraints to CONTEXT.md manually)
