# First Playable Frontend Spec

## Goal

Build the first playable experience for the interview-battle web app as a small, testable vertical slice.

First playable scope:
- title screen
- scenario start flow
- 3-turn battle loop
- turn result + follow-up reveal
- final result screen

Out of scope for first playable:
- real OpenAI evaluation
- full PWA install prompts
- multiple company themes with different art
- complete scenario library
- final audio pipeline

Primary target:
- mobile web first
- desktop still usable

## First Playable Definition

The first playable should let one user:
1. enter a company name
2. start one scripted battle
3. play through 3 turns
4. choose one action per turn
5. write a short answer per turn
6. receive scripted or rule-based feedback
7. see a final score and coaching summary

This is enough to validate:
- battle feel
- turn cadence
- action + short-answer UX
- follow-up question rhythm
- basic scoring comprehension

## Screen-by-Screen Build Order

### 1. Title Screen

Purpose:
- set tone
- collect company name
- let the player start

Must show:
- game title
- short subtitle
- company name input
- start button
- optional "sample company" hint

Build first because:
- it establishes app shell
- it gives a clean entry into the battle state machine

Can be mocked:
- background art
- idle sprite
- company theme logic

### 2. Battle Intro Screen

Purpose:
- transition from title to battle
- introduce interviewer and scenario

Must show:
- interviewer intro line
- company name inserted into text
- scenario incident brief
- initial active states

Build second because:
- it proves routing or phase-switching
- it validates the text-box presentation

Can be mocked:
- fixed interviewer sprite
- simple fade/slide motion
- one hardcoded scenario

### 3. Turn Screen

Purpose:
- run the core loop

Must show:
- turn number
- active battle states
- interviewer question
- 4 action choices
- selected action details
- short answer input
- submit button

Build third because:
- this is the product core

Can be mocked:
- action effectiveness
- follow-up generation
- score calculation

### 4. Turn Resolution Overlay

Purpose:
- show the used action
- reveal feedback
- show follow-up question
- update states

Must show:
- action result line
- effectiveness line
- coach feedback
- follow-up question
- state changes

Build fourth because:
- this creates the battle feel
- it separates "input phase" from "result phase"

Can be mocked:
- fixed feedback copy
- fixed follow-up question
- precomputed state transitions

### 5. Final Result Screen

Purpose:
- close the battle
- explain performance
- invite replay

Must show:
- total score
- 5 category scores
- strengths
- misses
- better answer example
- replay button

Build fifth because:
- it confirms the full battle loop works end-to-end

Can be mocked:
- final score aggregation
- LLM-polished coaching

### 6. Scenario Select or Retry Flow

Purpose:
- let the first playable be replayable

Must show:
- retry same scenario
- back to title
- optional next scenario

Build last because:
- not needed for first end-to-end validation

Can be mocked:
- only one scenario tile

## Recommended Top-Level App Structure

### App Shell

Responsibilities:
- global theme
- root layout
- top-level phase control
- shared background and audio toggle shell

Suggested component:
- `App`
- `AppShell`

### Phase Controller

Use a single explicit phase enum for the first implementation.

Suggested phases:
- `title`
- `battle_intro`
- `turn_prompt`
- `turn_input`
- `turn_resolution`
- `battle_result`

Why:
- simpler than routing for the first playable
- easier to animate between screens
- keeps all battle data in one place

## Screen Specs

### Title Screen

Suggested component:
- `TitleScreen`

Must-have props:
- `defaultCompanyName: string`
- `onStart: (companyName: string) => void`
- `isStarting?: boolean`

Local state:
- `companyName`
- `inputTouched`

Can be mocked:
- theme pack selection
- intro music

Validation:
- empty input should fall back to a default company

### Battle Intro Screen

Suggested component:
- `BattleIntroScreen`

Must-have props:
- `companyName: string`
- `scenarioTitle: string`
- `introText: string`
- `incidentBrief: string`
- `initialStates: BattleStateViewModel[]`
- `onContinue: () => void`

Local state:
- none required if parent controls sequence

Can be mocked:
- sprite art
- state descriptions collapsed by default

### Turn Screen

Suggested component:
- `TurnScreen`

Subcomponents:
- `BattleStage`
- `BattleHUD`
- `StateChipList`
- `DialogueBox`
- `ActionMenu`
- `ActionDetailPanel`
- `AnswerComposer`

Must-have props:
- `turnNumber: number`
- `maxTurns: number`
- `activeStates: BattleStateViewModel[]`
- `questionText: string`
- `turnGoalText: string`
- `actions: ActionOptionViewModel[]`
- `selectedActionId: string | null`
- `answerText: string`
- `answerMinLength: number`
- `answerMaxLength: number`
- `onSelectAction: (actionId: string) => void`
- `onChangeAnswer: (value: string) => void`
- `onSubmit: () => void`
- `isSubmitDisabled: boolean`
- `isSubmitting: boolean`

Local state:
- optional focus state only

Can be mocked:
- timers
- real scoring API

### Turn Resolution Overlay

Suggested component:
- `TurnResolutionOverlay`

Must-have props:
- `selectedActionLabel: string`
- `resultLine: string`
- `coachLine: string`
- `missLine?: string`
- `followUpQuestion?: string`
- `stateChanges: StateChangeViewModel[]`
- `scoreDelta?: number`
- `onContinue: () => void`

Local state:
- animation step index if needed

Can be mocked:
- score delta
- dynamic follow-up timing

### Final Result Screen

Suggested component:
- `BattleResultScreen`

Must-have props:
- `totalScore: number`
- `categoryScores: CategoryScore[]`
- `strengths: string[]`
- `misses: string[]`
- `betterAnswer: string`
- `onRetry: () => void`
- `onBackToTitle: () => void`

Local state:
- none required

Can be mocked:
- charts or complex animations

## Shared Component List

### `DialogueBox`

Responsibilities:
- render battle text
- optionally animate typing
- allow skip

Must-have props:
- `text: string`
- `speaker?: string`
- `variant: "narration" | "question" | "result"`
- `isTyping?: boolean`
- `onComplete?: () => void`

Can be mocked first:
- render full text instantly

### `StateChipList`

Responsibilities:
- show active states
- highlight changed states
- reveal short descriptions

Must-have props:
- `states: BattleStateViewModel[]`
- `highlightedStateIds?: string[]`
- `maxVisible?: number`

Can be mocked first:
- text-only chips, no icons

### `ActionMenu`

Responsibilities:
- show 4 actions
- manage selected state visually

Must-have props:
- `actions: ActionOptionViewModel[]`
- `selectedActionId: string | null`
- `onSelect: (actionId: string) => void`
- `disabled?: boolean`

Can be mocked first:
- simple buttons instead of battle-grade menu

### `AnswerComposer`

Responsibilities:
- collect 1-2 sentence answer
- enforce length
- show prompt text

Must-have props:
- `value: string`
- `minLength: number`
- `maxLength: number`
- `onChange: (value: string) => void`
- `onSubmit: () => void`
- `disabled?: boolean`
- `submitDisabled?: boolean`

Can be mocked first:
- plain textarea

### `BattleStage`

Responsibilities:
- hold background, platforms, sprites, light effects

Must-have props:
- `companyTheme: string`
- `phase: BattlePhase`
- `lastActionType?: ActionVisualType`
- `highlightedStateType?: string`

Can be mocked first:
- static background blocks
- placeholder silhouettes

## Must-Have State Model for Frontend

Keep frontend state lean and explicit.

### Root app state

```ts
type AppPhase =
  | "title"
  | "battle_intro"
  | "turn_prompt"
  | "turn_input"
  | "turn_resolution"
  | "battle_result";
```

```ts
type AppState = {
  phase: AppPhase;
  companyName: string;
  scenario: ScenarioViewModel | null;
  battle: BattleSessionState | null;
};
```

### Battle session state

```ts
type BattleSessionState = {
  turnIndex: number;
  maxTurns: number;
  activeStateIds: string[];
  selectedActionId: string | null;
  answerText: string;
  turnResults: TurnResultViewModel[];
  currentFollowUp: string | null;
};
```

### View models

```ts
type BattleStateViewModel = {
  id: string;
  name: string;
  shortDescription: string;
  category: "pressure" | "system" | "dependency" | "user" | "recovery";
};
```

```ts
type ActionOptionViewModel = {
  id: string;
  label: string;
  flavorText: string;
  description: string;
  visualType: "analysis" | "mitigation" | "rollback" | "communication";
};
```

```ts
type TurnResultViewModel = {
  turnNumber: number;
  selectedActionId: string;
  score: number;
  resultLine: string;
  coachLine: string;
  missLine?: string;
  followUpQuestion?: string;
  addedStateIds?: string[];
  resolvedStateIds?: string[];
};
```

## Data Dependencies

### Needed for first playable

#### Scenario data
- one full scenario JSON
- 3 turns
- 2-3 initial states
- 4 actions per turn
- fixed follow-up questions
- fixed result templates

#### State data
- 12 states can exist globally
- first playable only needs the states used by the chosen scenario

#### Action data
- 10 actions can exist globally
- first playable only needs the 4-6 actions referenced by the scenario

#### Scoring data
- simple deterministic score map
- action effectiveness by turn
- optional keyword bonuses

### Can be mocked for first implementation

#### Mocked scenario source
- static TypeScript object
- no fetch required at first

#### Mocked evaluation
- local `evaluateTurn()` utility
- no backend required

#### Mocked final coaching
- static string templates
- no OpenAI call required

#### Mocked animation triggers
- local booleans and timeouts

## First Implementation Mock Strategy

### Mock everything except the core loop

For the first implementation, do not wait on backend, AI, or final art.

Mock now:
- scenario data
- scoring
- follow-up questions
- sprites
- background
- sound effects

Make real later:
- backend JSON loading
- rule engine
- LLM coaching
- pixel art
- audio pack

### Best first-playable stack

- `src/mocks/scenarioLoginDeploy.ts`
- `src/lib/evaluateTurnMock.ts`
- `src/lib/finalizeBattleMock.ts`

This keeps the first battle fully local.

## Concrete Build Order

### Step 1
- app shell
- title screen
- phase switching

Success check:
- can enter company name and start

### Step 2
- battle intro screen
- dialogue box
- state chip list

Success check:
- one scripted scenario intro can play through

### Step 3
- turn screen layout
- action menu
- answer composer

Success check:
- can select one action and enter text

### Step 4
- local mock evaluation
- turn resolution overlay
- follow-up reveal

Success check:
- one turn can fully resolve and advance

### Step 5
- 3-turn battle progression
- state updates between turns

Success check:
- full battle completes locally

### Step 6
- final result screen
- retry flow

Success check:
- full loop replayable from browser without refresh

### Step 7
- animation pass
- mobile polish
- basic manifest and PWA shell

Success check:
- battle feels game-like on phone

## Frontend Risks to Avoid

- do not build routing-heavy structure first
- do not block on backend APIs
- do not mix animation timing with scoring logic
- do not store battle logic inside UI components
- do not overbuild a generalized battle engine yet

## Recommended File Structure

```txt
src/
  app/
    App.tsx
    AppShell.tsx
  screens/
    TitleScreen.tsx
    BattleIntroScreen.tsx
    TurnScreen.tsx
    BattleResultScreen.tsx
  components/
    BattleStage.tsx
    BattleHUD.tsx
    DialogueBox.tsx
    StateChipList.tsx
    ActionMenu.tsx
    ActionDetailPanel.tsx
    AnswerComposer.tsx
    TurnResolutionOverlay.tsx
  lib/
    battlePhases.ts
    battleReducer.ts
    evaluateTurnMock.ts
    finalizeBattleMock.ts
  mocks/
    scenarioLoginDeploy.ts
  types/
    battle.ts
```

## What a Frontend Architect Should Freeze Before Coding

Freeze these before implementation starts:
- battle phase list
- one scenario contract
- turn input contract
- turn result contract
- exact first-playable screen list

Do not freeze yet:
- final API shape
- multi-scenario loader
- OpenAI prompt shape
- full art system
- complete audio behavior

## Short Recommendation

Build the first playable as a single-scenario local vertical slice with a phase-driven UI state machine.

The first version should fake almost everything except:
- battle flow
- action selection
- short answer input
- turn feedback rhythm
- final result comprehension
