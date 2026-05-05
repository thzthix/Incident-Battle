# Frontend Stack Decision

## Decision

Use `React + TypeScript + Vite` for the first real frontend implementation.

Do not continue the main product implementation as a plain static DOM app.

## Why

This project already has frontend architecture assumptions that map cleanly to React:

- explicit battle phase model
- reducer-based battle progression
- many presentational subcomponents
- shared scenario data models
- controlled textbox / interaction / result modes

Those are all easier to implement and maintain in React than in ad-hoc DOM scripting.

## Recommended Stack

### Core

- `React`
- `TypeScript`
- `Vite`

### Styling

- plain CSS
- CSS custom properties
- component-scoped class naming

Do not add Tailwind for the first slice.
The battle UI has a very custom layout and animation rhythm, so plain CSS is the more stable base.

### State Management

- local React state
- `useReducer` for battle flow

Do not add Redux, Zustand, or XState in v1.

### Data

- load local JSON from:
  - [data/scenarios.first-playable.v1.json](/Users/seoha/Documents/Codex/2026-05-05-cs/data/scenarios.first-playable.v1.json)
  - [data/states.v1.json](/Users/seoha/Documents/Codex/2026-05-05-cs/data/states.v1.json)
  - [data/actions.v1.json](/Users/seoha/Documents/Codex/2026-05-05-cs/data/actions.v1.json)

### Animation

- CSS transitions / keyframes
- tiny JS coordination only when needed

Do not add Framer Motion in the first slice.

## Why Not Plain Static JS

Plain JS was attractive only because:

- it avoids install friction
- it is fast to spike

But for this product it loses too much:

- phase transitions become harder to reason about
- text, state chips, and input modes become more coupled
- scenario-driven rendering gets more brittle
- refactoring into a bigger app becomes more expensive

## Why Not Next.js

Not needed for first playable.

This app currently needs:

- a client-heavy battle loop
- local data loading
- minimal deployment complexity

SSR or app-router complexity does not help yet.

## Why Not Tailwind First

Tailwind is not wrong, but for this app it adds little at the moment.

The battle screen needs:

- strong spatial control
- unusual layering
- custom retro UI styling
- highly specific animation timing

Plain CSS will be easier to tune against the DPPT-like battle grammar.

## Build Recommendation

Build the first slice as:

1. `Vite React TS` app shell
2. `BattleFlowPage` with reducer
3. local JSON loader
4. scene layout and textbox flow
5. action select and answer input
6. turn resolution and final result

## PWA Recommendation

Keep the existing lightweight PWA idea:

- manifest
- basic service worker

But wire it into the React build output later, not as the main architecture decision.

## PM Recommendation

Proceed with React unless there is a very strong reason to optimize for zero-install prototyping only.

For this project, the maintainability gain is worth it.
