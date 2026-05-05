# First Playable Content Contract

## Purpose

Freeze the `content contract` for the first playable before UI implementation gets more detailed.

This contract answers:

- what every playable scenario must contain
- what can vary by scenario
- what the battle screen can safely assume

## Scope

This contract applies to the first 5 production-priority scenarios:

1. `배포 직후 로그인 실패`
2. `트래픽 급증으로 DB 과부하`
3. `결제 또는 외부 API 장애`
4. `결제 후처리 큐 적체와 중복 리스크`
5. `배포 직후 DB 락 대기`

Reference pack:

- [docs/first-playable-scenarios-v1.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/first-playable-scenarios-v1.md)

## Non-Negotiable Rules

### 1. Every battle is 3 turns

No scenario in the first playable may exceed:

- `3` turns
- `1` core question per turn
- `1` follow-up event per turn

### 2. Every scenario starts with the same information density

The opening incident payload should contain:

- `1` time context
- `1` primary user-impact surface
- `2~3` numeric signals
- `1` contradictory clue
- `1` operational constraint
- `1` wrong-move risk

### 3. Questions follow the same ladder

- turn 1:
  - `무엇을 먼저 확인할 것인가`
- turn 2:
  - `지금 어떤 대응을 할 것인가`
- turn 3:
  - `무엇을 검증하고 다음에 무엇을 바꿀 것인가`

### 4. States are visible, techniques are ephemeral

- persistent battle conditions live in `state chips`
- interviewer pressure or move names appear as temporary labels and textbox declarations
- player moves appear as action selections and textbox declarations

### 5. The textbox is the final explanation layer

The battle screen may decorate meaning above the textbox, but the real explanation must always be shown in the textbox.

## Scenario Content Template

Every first-playable scenario must provide the following content sections.

### Identity

- `id`
- `title`
- `theme`
- `difficulty`
- `companyFlavor`

### Battle Intro

- `opponentIntroLine`
- `fullIncidentBrief`
- `openingGoalLine`

### Realism Anchors

- `timeContext`
- `impactSurface`
- `measurableSignals[]`
- `contradictoryClue`
- `constraint`
- `wrongMoveRisk`

### Opening Battle Presentation

- `startingStateIds[]`
- `openingRevealLines[]`

Rule:

- opening reveal lines should be `4~6` textbox-ready lines
- each line must be short enough to read in one beat

### Turn Structure

Each turn must include:

- `turnNumber`
- `goalLine`
- `question`
- `candidateActionIds[]`
- `strongAnswerPoints[]`
- `commonMistakes[]`

Optional but recommended:

- `bestActionIds[]`
- `coachHint`

### Turn 2 / Turn 3 Progression

Each later turn must include:

- `revealLines[]`
- optional `newStateIds[]`
- optional `resolvedStateIds[]`
- optional `dimmedStateIds[]`

### Follow-Ups

Each scenario must include exactly `3` follow-up events for first playable:

- `followupAfterTurn1`
- `followupAfterTurn2`
- `followupAfterTurn3`

Each follow-up needs:

- `techniqueLabel`
- `flavorLine`
- `questionLine`

### Result / Coaching

Each scenario must support:

- per-turn feedback
- final strengths
- final misses
- final better-answer direction

## UI Guarantees

If the content obeys this contract, the battle UI can safely assume:

- one opening reveal block
- one question per turn
- four actions per turn
- one short answer input per turn
- one result block per turn
- one follow-up event per turn
- one final result card

## What Can Vary

These may vary by scenario without breaking the UI:

- exact state combinations
- exact metrics and numbers
- exact contradictory clue
- exact follow-up pressure type
- the strongest recommended action

## What Must Not Vary In v1

These must stay fixed for the first playable:

- `3-turn loop`
- `4 actions shown per turn`
- `1 answer input per turn`
- `3 total follow-ups`
- `textbox-first reveal grammar`

## PM Freeze Decision

Before any deeper screen or component work, the five first-playable scenarios should be normalized against this contract.

Only after that should we treat:

- wireframes
- reducer phases
- animation choreography

as fully stable.
