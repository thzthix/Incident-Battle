# Implementation Brief

## Goal

Build a small, playable web app MVP for the interview battle concept.

## Input And Output Contract

Input per turn:

- current scenario id
- turn number
- active battle states
- selected action id
- one or two supporting sentences

Output per turn:

- turn score
- strengths
- misses
- feedback line
- next narration
- optional new state

Final output:

- total score out of 100
- category scores
- strengths
- misses
- recommended answer flow

## Suggested Stack

- frontend: React + TypeScript + Vite
- backend: FastAPI
- content storage: JSON files
- persistence: none for MVP

## Core Data Models

### `Scenario`

- `id`
- `title`
- `archetype`
- `companyFlavor`
- `introText`
- `incidentBrief`
- `startingStateIds`
- `turns`
- `tags`

### `ScenarioTurn`

- `turnNumber`
- `phase`
- `narrationLines`
- `question`
- `candidateActionIds`
- `revealStateIds`
- `idealReasoningPath`
- `commonMistakes`

### `BattleState`

- `id`
- `category`
- `battleName`
- `shortDescription`
- `interviewMeaning`
- `strongActionIds`
- `tags`

### `Action`

- `id`
- `category`
- `label`
- `battleFlavorText`
- `intentTags`
- `strongAgainstTags`
- `weakAgainstTags`

## Evaluation Model

Score five categories:

- impact awareness
- prioritization
- technical reasoning
- action quality
- communication clarity

MVP evaluation should be rule-based:

- match action tags to active state tags
- add small bonus if the typed answer mentions key concepts
- build feedback from templates

## Frontend Boundaries

- `BattleScreen`
- `SpriteStage`
- `BattleHud`
- `StateChipList`
- `DialogueBox`
- `ActionMenu`
- `AnswerInputPanel`
- `TurnFeedbackPanel`
- `FinalReportModal`
- `AudioToggle`

## Backend Boundaries

- `GET /scenarios`
- `GET /scenarios/{id}`
- `GET /states`
- `GET /actions`
- `POST /battle/evaluate-turn`
- `POST /battle/finalize`

Internal modules:

- `content_loader`
- `battle_rules`
- `scoring_engine`
- `feedback_builder`
- `schemas`

## Content Authoring Rules

- keep scenarios mostly linear
- do not require one hidden correct action
- define good reasoning order, not one perfect sentence
- keep each turn readable in one screen
- every state and action must include human-readable explanation text

## Asset Strategy

- original pixel sprites only
- original or licensed audio only
- all assets replaceable through simple file paths
- no gameplay dependency on copyrighted third-party assets

## Defer For Later

- LLM freeform grading
- campaign mode
- account system
- adaptive scenario generation
- heavy animation systems
- multiplayer or real-time judge agents
