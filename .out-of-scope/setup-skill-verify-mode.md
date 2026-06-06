# Verify/Check Mode for `init`

This project will not add a dedicated verify/check mode (or a separate verify skill) for `init`.

The intended workflow is: **run `/setup` and tell it to verify your current setup.** The skill is prompt-driven, so the maintainer can scope it to a verification pass ("don't rewrite anything, just check my existing files against the current seed templates and report drift") without needing a separate code path. Adding a flag or a sibling skill would split the surface area of a feature that's already expressible through the natural-language entry point.

- #106 — Feature request: verify/check mode for the setup skill
