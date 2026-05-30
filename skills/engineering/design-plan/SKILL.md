---
name: design-plan
description: Convert an approved PRD into an implementation-ready technical design covering architecture impact, interface design, data models, execution flow, and task planning. Use when a PRD has been approved and you need to design the solution before writing code.
---

# Design Plan

Create a technical design and execution plan for:

$ARGUMENTS

## Purpose

An approved PRD already exists.

Your job is to convert the PRD into an implementation-ready technical design.

Do not write code.

Do not modify files.

Do not begin implementation.

If requirements are unclear, stop and ask questions.

---

# Process

## 1. Validate Requirements

Review:

* PRD
* Existing codebase
* Existing architecture

Identify:

* missing details
* conflicting requirements
* technical blockers

If any exist:

STOP.

Ask for clarification.

---

## 2. Analyze Existing System

Identify:

* relevant modules
* relevant services
* relevant APIs
* relevant data models
* relevant infrastructure

Document current behavior and constraints.

---

## 3. Design The Solution

Determine:

* affected components
* new components
* interface changes
* data model changes
* execution flow
* algorithm changes

Prefer minimal changes that satisfy the PRD.

Avoid unnecessary refactoring.

---

## 4. Define Execution Contract

Specify:

* files allowed to change
* files to create
* files that must not change

Break work into implementation tasks with dependencies.

---

## 5. Define Validation Strategy

Specify:

* unit tests
* integration tests
* e2e tests
* build verification
* regression checks

---

# Output Format

## PRD Validation

Status:
PASS | BLOCKED

Issues:

* ...

Open Questions:

* ...

---

## Existing System Analysis

### Relevant Components

* ...

### Current Flow

* ...

### Constraints

* ...

---

## Architecture Impact

### Affected Components

* ...

### New Components

* ...

### Compatibility Concerns

* ...

---

## File Change Contract

### Allowed Changes

* path/to/file

### New Files

* path/to/file

### Forbidden Changes

* path/to/file

### File-Level Plan

File:
...

Current Responsibility:
...

Planned Change:
...

Risk:
LOW | MEDIUM | HIGH

---

## Interface Design

### External Interfaces

Interface:
...

Purpose:
...

Inputs:
...

Outputs:
...

Failure Modes:
...

### Internal Interfaces

Component:
...

Responsibility:
...

Interactions:
...

---

## Data Model Design

### Existing Models Affected

* ...

### New Models

* ...

### Schema Changes

* ...

### Migration Requirements

* ...

---

## Execution Flow

Describe the end-to-end flow.

Include:

* major components
* state transitions
* error handling

---

## Algorithm Design

Algorithm:
...

Objective:
...

Inputs:
...

Outputs:
...

Steps:
1.
2.
3.

Edge Cases:

* ...

Failure Handling:

* ...

---

## Task Graph

Task 1:
...

Depends On:
None

Completion Criteria:
...

Task 2:
...

Depends On:
Task 1

Completion Criteria:
...

---

## Verification Plan

### Unit Tests

* ...

### Integration Tests

* ...

### E2E Tests

* ...

### Build Validation

* ...

### Regression Checks

* ...

---

## Risks

### HIGH

* ...

### MEDIUM

* ...

### LOW

* ...

---

## Rollback Plan

* ...

---

## Stop Conditions

Stop and ask for clarification if:

* requirements conflict with implementation reality
* schema assumptions are invalid
* undocumented dependencies appear
* security implications are unclear
* multiple valid architectures exist

---

## Implementation Readiness

Complexity:
LOW | MEDIUM | HIGH

Confidence:
LOW | MEDIUM | HIGH

Ready For Implementation:
YES | NO

---

WAITING FOR APPROVAL

Do not write code.

Do not modify files.

Do not begin implementation.
