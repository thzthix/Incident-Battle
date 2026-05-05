# Frontend Coding Conventions

## Purpose

Define the baseline frontend coding style for this project before deeper implementation starts.

This applies to:

- React components
- hooks
- reducer logic
- TypeScript models
- CSS

## General Principles

- keep the code junior-readable
- separate battle flow logic from rendering
- keep components small and focused
- prefer explicit names over clever ones
- keep animation logic shallow and understandable

## File and Naming Rules

### Components

- use `PascalCase`
- one main component per file

Examples:

- `BattleFlowPage.tsx`
- `BattleSceneLayout.tsx`
- `StateChipBar.tsx`

### Hooks

- use `camelCase`
- always start with `use`

Examples:

- `useBattleFlow.ts`
- `useTypewriterText.ts`

### Reducers / helpers

- use `camelCase`

Examples:

- `battleReducer.ts`
- `buildScenarioViewModel.ts`

### Types

- use `PascalCase`

Examples:

- `BattlePhase`
- `ScenarioContent`
- `TurnResolutionViewModel`

## React Component Rules

### 1. Container vs Presentational Split

Use a clear split:

- container components own logic and state wiring
- presentational components render props

Examples:

- container:
  - `BattleFlowPage`
- presentational:
  - `OpponentHUD`
  - `DialogueBox`
  - `ActionMenu`

### 2. Keep Props Explicit

Prefer explicit props over giant opaque objects when practical.

Good:

```tsx
<DialogueBox
  label={floatingLabel}
  line={currentLine}
  onAdvance={handleAdvance}
/>
```

Bad:

```tsx
<DialogueBox battle={battleState} />
```

### 3. Do Not Hide Core Flow In Effects

Battle phase progression should be driven by reducer actions or explicit handlers, not by scattered `useEffect` chains.

Good:

- click handler dispatches `ADVANCE_DIALOGUE`
- submit handler dispatches `SUBMIT_TURN`

Bad:

- phase changes happen implicitly inside unrelated `useEffect`s

### 4. Use Comments Sparingly

Add comments only where the battle grammar or phase logic would otherwise be hard to follow.

## TypeScript Rules

### 1. Prefer Types For View Models

Use named types for:

- scenario content
- state chips
- actions
- dialogue lines
- turn results

### 2. Avoid `any`

Do not use `any` unless there is no practical alternative.

### 3. Use String Unions For Fixed Modes

Good:

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

## Reducer Rules

### 1. One Main Reducer

Use one main `battleReducer` for first playable.

It should own:

- phase
- turn index
- selected action
- answer draft
- active states
- dialogue queue
- turn results
- final result

### 2. Reducer Actions In Upper Snake Strings

Good:

- `START_BATTLE`
- `SELECT_ACTION`
- `UPDATE_ANSWER`
- `SUBMIT_TURN`

### 3. Keep Reducer Pure

Do not fetch data, read DOM, or trigger timers inside the reducer.

## CSS Rules

### 1. Use Plain CSS With Variables

Define shared tokens with CSS custom properties.

Examples:

- `--bg-night`
- `--panel-cream`
- `--accent-warning`
- `--chip-border`

### 2. Class Naming

Use readable kebab-case classes.

Examples:

- `.battle-screen`
- `.state-chip-bar`
- `.dialogue-box`
- `.action-grid`

### 3. Keep Animations Named By Meaning

Good:

- `battle-intro-pop`
- `chip-pulse`
- `textbox-rise`

Bad:

- `anim1`
- `wiggle2`

### 4. Reduced Motion Support

Any large movement should have a reduced-motion fallback.

## Formatting Rules

### JavaScript / TypeScript

- semicolons: yes
- quotes: single quotes
- trailing commas: yes where valid
- prefer early returns over deep nesting

### JSX

- one prop per line when a component becomes dense
- keep conditional rendering shallow

### CSS

- one declaration per line
- group by layout -> spacing -> color -> motion

## Component Complexity Guard

If a component starts doing more than one of these, split it:

- own battle phase logic
- format scenario data
- render large UI blocks
- manage animation timing

## Testing Mindset

Even before full tests, structure code so these are easy to validate:

- scenario loads correctly
- phase transitions happen in order
- action selection updates the right state
- answer submission does not break the turn loop
- result view renders from mocked turn evaluation

## PM Recommendation

Freeze these conventions before the React implementation starts.

That will make multi-agent implementation work much easier to judge and merge.
