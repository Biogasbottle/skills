---
name: setup
description: Initialize a repo's agent memory system — boot protocol, domain glossary, ADRs, issue tracker config, and docs/ directory structure. Creates CLAUDE.md or AGENTS.md with boot protocol, scaffolds the docs/ tree, and configures issue tracker + triage labels. Use when setting up a new repo, onboarding a project to these skills, or fixing a missing/incomplete agent config.
---

# Init

Scaffold the per-repo configuration and memory system that the engineering skills depend on.

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

## Process

### 1. Explore

Look at the current repo to understand its starting state. Read whatever exists; don't assume:

- `git remote -v` and `.git/config` — is this a GitHub repo? Which one?
- `CLAUDE.md` and `AGENTS.md` at the repo root — which exists? Is there already a boot protocol in either?
- `CONTEXT.md` and `CONTEXT-MAP.md` at the repo root
- `docs/` — what already exists?
- `docs/adr/` and any `src/*/docs/adr/` directories
- `.scratch/` — sign that a local-markdown issue tracker convention is already in use

### 2. Present findings and ask

Summarise what's present and what's missing. Then walk the user through the three decisions **one at a time** — present a section, get the user's answer, then move to the next. Don't dump all three at once.

Assume the user does not know what these terms mean. Each section starts with a short explainer (what it is, why these skills need it, what changes if they pick differently). Then show the choices and the default.

**Section A — Issue tracker.**

> Explainer: The "issue tracker" is where issues live for this repo. Skills like `to-issues`, `triage`, `to-prd` read from and write to it — they need to know whether to call `gh issue create`, write a markdown file under `.scratch/`, or follow some other workflow you describe. Pick the place you actually track work for this repo.

Default posture: these skills were designed for GitHub. If a `git remote` points at GitHub, propose that. If a `git remote` points at GitLab (`gitlab.com` or a self-hosted host), propose GitLab. Otherwise (or if the user prefers), offer:

- **GitHub** — issues live in the repo's GitHub Issues (uses the `gh` CLI)
- **GitLab** — issues live in the repo's GitLab Issues (uses the [`glab`](https://gitlab.com/gitlab-org/cli) CLI)
- **Local markdown** — issues live as files under `.scratch/<feature>/` in this repo (good for solo projects or repos without a remote)
- **Other** (Jira, Linear, etc.) — ask the user to describe the workflow in one paragraph; the skill will record it as freeform prose

**Section B — Triage label vocabulary.**

> Explainer: When the `triage` skill processes an incoming issue, it moves it through a state machine — needs evaluation, waiting on reporter, ready for an AFK agent to pick up, ready for a human, or won't fix. To do that, it needs to apply labels (or the equivalent in your issue tracker) that match strings *you've actually configured*. If your repo already uses different label names (e.g. `bug:triage` instead of `needs-triage`), map them here so the skill applies the right ones instead of creating duplicates.

The five canonical roles:

- `needs-triage` — maintainer needs to evaluate
- `needs-info` — waiting on reporter
- `ready-for-agent` — fully specified, AFK-ready (an agent can pick it up with no human context)
- `ready-for-human` — needs human implementation
- `wontfix` — will not be actioned

Default: each role's string equals its name. Ask the user if they want to override any. If their issue tracker has no existing labels, the defaults are fine.

**Section C — Domain docs.**

> Explainer: Some skills (`improve-codebase-architecture`, `diagnose`, `tdd`) read a `CONTEXT.md` file to learn the project's domain language, and `docs/adr/` for past architectural decisions. They need to know whether the repo has one global context or multiple (e.g. a monorepo with separate frontend/backend contexts) so they look in the right place.

Confirm the layout:

- **Single-context** — one `CONTEXT.md` + `docs/adr/` at the repo root. Most repos are this.
- **Multi-context** — `CONTEXT-MAP.md` at the root pointing to per-context `CONTEXT.md` files (typically a monorepo).

### 3. Scaffold

Run the bundled script to create the directory structure and seed files:

```bash
node /path/to/skills/engineering/setup/scripts/init-memory-system.js /absolute/path/to/repo
```

Do not overwrite existing files unless the user explicitly asks for migration or replacement.

### 4. Write boot protocol

**Pick the file to edit:**

1. If `CLAUDE.md` exists, edit it.
2. Else if `AGENTS.md` exists, edit it.
3. If neither exists, ask the user which one to create — don't pick for them.

Never create `AGENTS.md` when `CLAUDE.md` already exists (or vice versa) — always edit the one that's already there.

Add or update the `## Agent skills` and boot protocol block. The block is the same regardless of which file:

```markdown
## Agent skills

### Issue tracker

Issues are tracked on [GitHub / GitLab / local markdown]. See `docs/agents/issue-tracker.md`.

### Triage labels

Labels match the canonical five roles. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context / Multi-context. See `docs/agents/domain.md`.

### Boot protocol

1. Read `docs/INDEX.md` first, then load only task-relevant memory.
2. Read `CONTEXT.md` for domain language, business concepts, and naming ambiguity.
3. Read `docs/adr/` for architectural tradeoffs and rejected approaches.
4. Read `docs/flows/` for end-to-end business processes.
5. Keep Markdown in the repo as the memory source of truth.

### Memory ownership

- Stable domain terms: `CONTEXT.md`
- Architecture decisions: `docs/adr/NNNN-short-title.md`
- Product requirements: `docs/prd/`
- System/module navigation: `docs/architecture/`
- Coding and collaboration conventions: `docs/conventions/`
- Business flow knowledge: `docs/flows/`
- Gotchas and platform constraints: `docs/gotchas/`
- Temporary branch/session state: `docs/handoff/current.md`
- Uncertain memory proposals: `docs/agents/memory-patch.md`

### Privacy boundary

Never write real private data to project memory: phone numbers, user IDs, raw user content, payment-sensitive data, production secrets, or unsanitized logs.

### Rules
- if you need to make changes of the code has been manually modified, confirm with the user first.
```

If an `## Agent skills` block already exists in the chosen file, update its contents in-place rather than appending a duplicate. Don't overwrite user edits to the surrounding sections.

### 5. Done

Tell the user the setup is complete. Mention which engineering skills will now read from which config files, and that they can edit `docs/agents/*.md` directly later.

## Migration workflow (existing repos)

When applying this to an existing repo:

1. Preserve existing docs and agent rules.
2. Add missing layers incrementally.
3. Merge existing domain glossary into `CONTEXT.md`.
4. Convert long-lived decisions into ADRs instead of burying them in chat summaries.
5. Move temporary TODOs into `docs/handoff/current.md`, not long-term memory.
6. End by updating `docs/INDEX.md` with repo-specific loading guidance.

## Done criteria

- `CLAUDE.md` or `AGENTS.md` has a clear boot protocol and privacy boundary.
- `CONTEXT.md` contains project-specific domain language placeholders or real terms.
- `docs/INDEX.md` explains what to load for common task types.
- Core `docs/` directories exist.
- `docs/agents/` config files are populated.
- Existing user content was not overwritten accidentally.
