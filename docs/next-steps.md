# Next Steps

## Immediate Outputs

- [대표 시나리오 3 - 결제 또는 외부 API 장애](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/scenario-script-payment-api.md)
- [사용자 시나리오](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/user-scenarios.md)
- [꼬리질문 설계](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/follow-up-design.md)
- [역할 분장](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/production-roles.md)
- [현실감 규칙](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/scenario-realism-rules.md)
- [리라이트된 플래그십 시나리오](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/scenario-battle-login-deploy.md)
- [First Playable Content Contract](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/first-playable-content-contract.md)
- [Scenario JSON Schema v1](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/scenario-json-schema-v1.md)
- [First Playable Scenario Data](/Users/seoha/Documents/Codex/2026-05-05-cs/data/scenarios.first-playable.v1.json)
- [Battle Screen Wireframe Spec](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/battle-screen-wireframe-spec.md)
- [Battle Component Contract v1](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/battle-component-contract-v1.md)
- [Frontend Stack Decision](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/frontend-stack-decision.md)
- [Frontend Coding Conventions](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/frontend-coding-conventions.md)
- [Judge Harness v1](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/judge-harness-v1.md)
- [Feedback Standard v1](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/feedback-standard-v1.md)
- [Harness Workflow v1](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/harness-workflow-v1.md)

## What Happens Next

The next step is not implementation.
The next step is to create the first `content-quality baseline` for the game.

That means:

1. realism-pass the 3 representative scenarios
2. freeze the trimmed state and action sets
3. define follow-up question patterns
4. define the writing tone kit
5. only then lock the first playable build scope

Before implementation, also freeze the new `14-scenario pool` as the content backlog:

- [Scenario Pool v2](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/scenario-pool-v2.md)

## The Single Best Next Task

Rewrite the 5 first-playable scenarios to production quality:

- deploy login failure
- traffic spike after campaign
- payment or external API failure
- async post-processing backlog
- deploy-time DB lock wait

Each one must include:

- incident brief
- concrete time context
- measurable symptoms
- contradictory clue
- operational constraint
- wrong-move risk
- starting battle states
- turn 1 question
- turn 2 reveal and question
- turn 3 reveal and question
- candidate actions per turn
- strong answer points
- common mistakes
- follow-up questions
- final coaching points

Then:

1. split each long incident brief into battle-ready reveal lines
2. align the reveal lines with active states in the battle UI
3. convert the 5 first-playable scenarios into JSON-ready content blocks
4. freeze the battle screen wireframe and component contract
5. only then start the frontend vertical slice

Follow-up budget:

- tutorial: `1`
- normal scenario: `2`
- flagship scenario: `3`

## The Next 5 Deliverables

### 1. Core Game Spec Freeze

Owner:

- game planner
- battle systems designer

Definition of done:

- 3-turn battle structure is final
- input is `action select + 1-2 sentence explanation`
- score categories are frozen
- turn cadence is frozen

### 2. Scenario Content Pack v1

Owner:

- scenario collector
- mock interviewer

Definition of done:

- 5 complete scenarios
- 14 total scenario seeds
- each scenario has follow-up questions and coaching notes

### 3. Battle Language Kit

Owner:

- UX writer
- battle flavor writer

Definition of done:

- intro lines
- state reveal lines
- question attack lines
- result lines
- coaching sentence patterns

### 4. Art Direction Pack

Owner:

- pixel artist
- UI designer

Definition of done:

- one battle screen composition
- one textbox style
- one HUD style
- one opponent sprite direction
- one player sprite direction
- two background directions

### 5. MVP Build Spec

Owner:

- senior developer
- production planner

Definition of done:

- frontend and backend scope is frozen
- content file structure is frozen
- rule-based scoring vs LLM coaching boundary is frozen
- first playable slice is identified

## Things To Delay

Do not design these now:

- ranked mode
- campaign mode
- AI-generated move choices
- full LLM grading
- many company-specific worlds
- advanced animation polish

## Immediate Production Rule

If a task does not help finish the first 5 first-playable scenarios, it is probably not the next task.

## Quality Gate

From this point on, meaningful delegated work should use the harness:

1. assign the artifact
2. score with the correct rubric
3. require actionable feedback
4. retry if below threshold
