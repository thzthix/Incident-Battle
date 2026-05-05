# Judge Harness v1

## Purpose

Run sub-agent work with a repeatable loop:

1. assign scoped work
2. score the result
3. produce actionable feedback
4. retry if below the bar
5. adopt only passing output

This project does not need vague preference-based review.
It needs a judge harness that protects:

- interview usefulness
- battle feel
- implementation readiness
- clarity for a first-time player

## What The Judge May Evaluate

The judge harness can be used on:

- scenario writing
- follow-up question writing
- state and move naming
- battle UI copy
- wireframe proposals
- component architecture proposals
- JSON/content normalization proposals

## Default Pass Rule

- `95+`: adopt as-is or with tiny edits
- `90-94`: near-pass, revise once using judge feedback
- `80-89`: insufficient, must retry
- `<80`: reject and re-scope the task before retry

## Hard Fail Conditions

If any of these are true, the result fails even with a decent total score:

- it breaks the first-playable content contract
- it breaks the textbox-first battle grammar
- it is realistic but too dense to read in one battle run
- it is fun but no longer useful as interview training
- it is implementable only with much more scope than first playable allows
- it gives criticism without concrete revision guidance

## Rubric Families

Use the rubric family that matches the output type.

### A. Scenario Content Rubric

Use for:

- incident briefs
- turn scripts
- follow-up questions
- coaching lines

Scoring:

- `Interview realism` 25
- `Battle feel` 15
- `Clarity and readability` 15
- `Turn-structure fit` 15
- `Useful coaching value` 15
- `Contract compliance` 15

Passing interpretation:

- realism without overwhelm
- clear turn progression
- useful follow-up pressure
- teaches a reusable answer pattern

### B. Naming and Flavor Rubric

Use for:

- state names
- interviewer technique names
- player move names
- intro lines

Scoring:

- `Immediate understandability` 25
- `Pokemon-style battle flavor` 20
- `Consistency with system language` 20
- `Textbox readability` 15
- `Memorability` 10
- `Expansion safety` 10

Passing interpretation:

- a new user can infer meaning quickly
- a fan can feel the parody grammar
- the naming can scale to more content later

### C. Wireframe / UX Rubric

Use for:

- screen layouts
- panel flow
- information hierarchy

Scoring:

- `Information hierarchy` 25
- `Battle grammar fidelity` 20
- `Mobile usability` 15
- `Interaction clarity` 15
- `Implementation realism` 15
- `Support for content contract` 10

Passing interpretation:

- the user always knows what to read and what to do next
- the layout supports textbox-first pacing
- the UI can absorb the 5 first-playable scenarios without breaking

### D. Frontend Structure Rubric

Use for:

- component trees
- reducer plans
- state models
- implementation proposals

Scoring:

- `Fit to first-playable scope` 20
- `Separation of concerns` 20
- `Phase-model clarity` 20
- `Mockability and testability` 15
- `Low integration risk` 15
- `Junior-readable structure` 10

Passing interpretation:

- container and presentational boundaries are clean
- the battle loop can be built incrementally
- the structure does not over-engineer the MVP

## Judge Output Format

The judge must always return all of the following:

1. `Total score`
2. `Category scores`
3. `Pass / Revise / Reject`
4. `Top 3 strengths`
5. `Top 3 problems`
6. `Required fixes before retry`
7. `One example rewrite direction`

No silent fails.
No score-only judgments.

## Feedback Quality Rule

`A score without repair advice is an incomplete judgment.`

The judge must explain:

- what failed
- why it matters
- what specifically should change

Bad feedback:

- `현실감이 부족함`

Good feedback:

- `현실감이 부족함: 시간 맥락과 상충 단서가 없어 실제 장애처럼 읽히지 않습니다. 시작 브리프에 배포 후 몇 분인지, 어떤 사용자군만 영향을 받는지, 그리고 CPU는 안정적인데 특정 지표만 튄다는 단서를 추가하세요.`

## Retry Policy

### One-Retry Rule

Default:

- one failed submission gets one focused retry
- the retry prompt must include the judge’s required fixes

### Re-Scope Rule

If the second attempt is still below `90`:

- do not keep asking for vague retries
- re-scope the task more narrowly
- or split the task by artifact

Example:

- instead of `rewrite the whole scenario`
- retry with:
  - `rewrite only the opening brief`
  - `rewrite only the follow-up lines`

### Best-of-Multiple Rule

If two agents both pass:

- prefer the higher score
- if scores are within `2` points, merge the stronger parts manually

## PM Operating Rule

Do not use the harness on everything.

Use it where comparison and revision are genuinely valuable:

- scenario content
- naming
- UX copy
- UI structure proposals

Avoid overusing it on:

- tiny clerical edits
- already-frozen contracts
- low-value formatting work

## Recommended Judge Prompt Shape

When assigning a judge task, include:

- the artifact type
- the exact contract or spec it must satisfy
- the scoring rubric family
- the pass threshold
- the required feedback format

Minimum judge instruction:

`Score this using Scenario Content Rubric. Pass threshold is 95. If below threshold, list the top problems, required fixes, and a specific rewrite direction.`
