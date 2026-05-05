# Battle Component Contract v1

## Purpose

Define the first-playable component structure after freezing:

- content contract
- scenario JSON shape
- wireframe zones

This is the bridge between PM/UX design and React implementation.

## Architecture Principle

Use one explicit battle container with phase-based progression.

Recommendation:

- one smart container owns battle state
- mostly dumb presentational children render zones
- one reducer controls progression

## Top-Level Tree

```text
App
└─ BattleFlowPage
   ├─ BattleSceneLayout
   │  ├─ OpponentHUD
   │  ├─ BattleStage
   │  │  ├─ StageBackdrop
   │  │  ├─ StagePlatforms
   │  │  ├─ OpponentSprite
   │  │  ├─ PlayerSprite
   │  │  └─ BattleEffectsLayer
   │  ├─ StateChipBar
   │  ├─ FloatingLabel
   │  └─ DialogueBox
   ├─ BattleInteractionPanel
   │  ├─ ContinuePrompt
   │  ├─ ActionMenu
   │  ├─ ActionDetailPanel
   │  ├─ AnswerComposer
   │  ├─ TurnResolutionCard
   │  └─ FinalResultCard
   └─ IncidentReviewSheet
```

## Phase Model

```ts
type BattlePhase =
  | "intro"
  | "opening_reveal"
  | "question"
  | "action_select"
  | "answer_input"
  | "judge_buffer"
  | "turn_resolution"
  | "followup_reveal"
  | "state_update"
  | "result";
```

Why this split matters:

- `opening_reveal` keeps field effects separate from the question
- `action_select` preserves game feel
- `answer_input` preserves interview feel
- `judge_buffer` leaves room for future OpenAI-based scoring

## State Ownership

### Owned by `BattleFlowPage`

- `phase`
- `companyName`
- `scenarioContent`
- `turnIndex`
- `activeStates`
- `selectedActionId`
- `draftAnswer`
- `turnResults`
- `currentFollowup`
- `floatingLabel`
- `dialogueQueue`
- `finalResult`

### Local UI-only State

#### `ActionMenu`

- hovered item
- focus index

#### `AnswerComposer`

- textarea focus
- local validation touched state

#### `DialogueBox`

- typewriter progress
- skip state

## Core View Models

### `BattleStateChipVM`

```ts
type BattleStateChipVM = {
  id: string;
  label: string;
  shortDescription: string;
  emphasis: "normal" | "highlighted" | "dimmed";
};
```

### `DialogueLineVM`

```ts
type DialogueLineVM = {
  id: string;
  speaker: "system" | "interviewer" | "player" | "coach";
  text: string;
};
```

### `ActionOptionVM`

```ts
type ActionOptionVM = {
  id: string;
  label: string;
  flavorText: string;
  category: "recon" | "mitigation" | "judgment" | "communication";
};
```

### `TurnResolutionVM`

```ts
type TurnResolutionVM = {
  actionLabel: string;
  resultLine: string;
  coachLine: string;
  missLine: string;
};
```

## Component Responsibilities

### `BattleFlowPage`

Responsibilities:

- load scenario content
- initialize battle
- own reducer
- orchestrate phase changes
- call mock evaluation

### `BattleSceneLayout`

Responsibilities:

- render the 4 major spatial zones
- stay phase-agnostic
- receive already prepared view-model props

### `OpponentHUD`

Responsibilities:

- show opponent name
- show company flavor
- show turn count

### `BattleStage`

Responsibilities:

- stage layout only
- sprite positioning
- effects layer mount point

### `StateChipBar`

Responsibilities:

- render persistent states only
- show max `3` chips directly
- collapse extras into `+N`

### `FloatingLabel`

Responsibilities:

- render the temporary label above the textbox
- show only short labels:
  - state name
  - interviewer technique
  - player move

### `DialogueBox`

Responsibilities:

- render the current textbox line
- optionally type it out
- expose skip/continue hook

### `BattleInteractionPanel`

Responsibilities:

- switch the bottom panel mode based on `phase`
- ensure only one interaction mode is active at once

## Reducer Events

Recommended action set:

```ts
type BattleAction =
  | { type: "START_BATTLE" }
  | { type: "ADVANCE_DIALOGUE" }
  | { type: "SELECT_ACTION"; actionId: string }
  | { type: "UPDATE_ANSWER"; value: string }
  | { type: "SUBMIT_TURN" }
  | { type: "RESOLVE_TURN" }
  | { type: "SHOW_FOLLOWUP" }
  | { type: "APPLY_STATE_UPDATE" }
  | { type: "ADVANCE_TURN" }
  | { type: "FINISH_BATTLE" };
```

## Build Order

### Step 1

`BattleFlowPage + reducer`

Goal:

- make one mocked 3-turn battle advance end to end

### Step 2

`BattleSceneLayout + DialogueBox + FloatingLabel`

Goal:

- prove the textbox-first battle grammar

### Step 3

`StateChipBar + OpponentHUD + BattleStage`

Goal:

- make the battle visually legible

### Step 4

`ActionMenu + ActionDetailPanel`

Goal:

- validate 2x2 move selection UX

### Step 5

`AnswerComposer`

Goal:

- validate short-answer submission flow

### Step 6

`TurnResolutionCard + Follow-up reveal`

Goal:

- validate result rhythm and pressure carryover

### Step 7

`FinalResultCard`

Goal:

- finish the full loop

### Step 8

`BattleEffectsLayer`

Goal:

- add minimum viable DPPT-like motion

## PM Recommendation

Implementation should begin only after these references are treated as frozen enough:

- [docs/first-playable-content-contract.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/first-playable-content-contract.md)
- [docs/scenario-json-schema-v1.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/scenario-json-schema-v1.md)
- [docs/battle-screen-wireframe-spec.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/battle-screen-wireframe-spec.md)
