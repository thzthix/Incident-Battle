# Harness Workflow v1

## Purpose

Turn the judge harness into a default operating loop for this project.

This workflow is for:

- PM-led delegation
- sub-agent comparison
- quality gating
- controlled retries

## Default Loop

### Step 1. Define The Artifact

Before delegating, name the artifact clearly.

Examples:

- `opening incident brief`
- `turn 2 reveal lines`
- `state naming set`
- `battle wireframe proposal`
- `component tree proposal`

### Step 2. Name The Contract

State what the output must satisfy.

Examples:

- [docs/first-playable-content-contract.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/first-playable-content-contract.md)
- [docs/scenario-json-schema-v1.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/scenario-json-schema-v1.md)
- [docs/battle-screen-wireframe-spec.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/battle-screen-wireframe-spec.md)
- [docs/battle-component-contract-v1.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/battle-component-contract-v1.md)

### Step 3. Assign The Right Worker

Choose by artifact, not by vibes.

Recommended role mapping:

- scenario writing:
  - `시나리오 수집가`
  - `면접 코치`
- battle language:
  - `UX 라이터`
  - `포켓몬 감성 담당`
- UI structure:
  - `시니어 게임 기획자`
  - `시니어 개발자`

### Step 4. Judge The Output

Use the correct rubric family from:

- [docs/judge-harness-v1.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/judge-harness-v1.md)

### Step 5. Require Feedback

The judge output must follow:

- [docs/feedback-standard-v1.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/feedback-standard-v1.md)

### Step 6. Retry Or Adopt

- `95+`:
  - adopt
- `90~94`:
  - one focused revision
- `<90`:
  - retry with narrowed scope or reject

## Default Retry Prompt Shape

Use this pattern:

`Your previous output scored 88/100. Required fixes: 1) add one contradictory clue, 2) shorten turn 2 question, 3) make final coaching specific. Rewrite only the opening brief, turn 2 question, and final coaching.`

## Multi-Agent Comparison Rule

When comparing two or more outputs:

1. score each independently
2. identify strongest strengths per candidate
3. if one candidate is clearly higher, adopt it
4. if scores are close, merge manually

Do not average weak outputs into mediocrity.

## Feedback Gate

No artifact is considered reviewed unless it has:

- a score
- strengths
- failures
- required fixes

If one is missing, the review is incomplete.

## PM Rule

The PM should only delegate when:

- comparison is useful
- revision will clearly improve the artifact
- the artifact has a stable contract to judge against

Do not spawn workers just to create noise.

## Recommended First Use Cases

Use the harness next on:

1. normalizing the 5 first-playable scenarios into schema v1
2. refining theme card copy
3. refining state/technique naming
4. comparing early battle screen copy proposals

## Success Condition

The harness is working when:

- weak outputs get specific repair guidance
- retries converge faster
- adopted artifacts are easier to implement
- product feedback quality improves because internal review quality improved first
