# Battle Screen Wireframe Spec

## Purpose

Define the first-playable battle screen at the level of:

- spatial zones
- information hierarchy
- battle grammar
- interaction phases

This spec is intentionally higher level than implementation details.

## Core Rule

`위에는 상황과 긴장, 아래에는 해석과 선택`

The upper half should feel like battle theater.
The lower half should handle reading, choice, and response.

## Primary Zones

Use 4 stable zones.

### Zone 1. Opponent HUD

Location:

- top area

Contains:

- opponent name
- company flavor
- optional turn marker
- optional tiny pressure badge

Purpose:

- identify the battle
- keep the opponent present without clutter

### Zone 2. Battle Stage

Location:

- upper-middle

Contains:

- background
- stage platforms
- opponent sprite
- player sprite
- ephemeral VFX layer

Purpose:

- sell the DPPT-like battle feeling
- host short event flashes and tiny camera nudges

### Zone 3. State Rail

Location:

- between stage and textbox

Contains:

- persistent state chips only

Rules:

- show up to `3` chips directly
- if more, collapse into `+1`
- highlight only `1~2` chips per event pulse

Purpose:

- show what remains active across turns
- never carry long copy

### Zone 4. Textbox + Interaction Panel

Location:

- bottom anchored area

Contains:

- temporary label above textbox
- main textbox
- context-dependent interaction panel

Purpose:

- act as the main reading and decision area
- preserve the one-thought-at-a-time battle rhythm

## Textbox Stack

### Layer A. Temporary Label

This is the short strip above the main textbox.

Allowed content only:

- state label
- interviewer technique name
- player action name
- tiny result accent

Good examples:

- `묶인 회선`
- `프레셔`
- `범위 파악`
- `효과는 굉장했다!`

Forbidden content:

- long question copy
- metric-heavy brief
- full coaching explanation

### Layer B. Main Textbox

This is the canonical explanation layer.

It must handle:

- battle intro line
- state flavor line
- state meaning line
- interviewer question
- player action declaration
- result line
- coach line

## Interaction Panel Modes

The interaction area below the textbox must show only one mode at a time.

### Mode 1. Continue Prompt

Used during:

- battle intro
- state reveal
- question reveal

Contains:

- simple `다음`
- optional tap-anywhere hint

### Mode 2. Action Select

Used during:

- action selection phase

Contains:

- 2x2 action grid
- compact action detail panel

### Mode 3. Answer Compose

Used during:

- short-answer phase

Contains:

- selected action badge
- textarea
- character guide
- submit button

### Mode 4. Turn Resolution

Used during:

- result phase

Contains:

- result line recap
- coach point
- missed point
- continue CTA

### Mode 5. Final Result

Used during:

- battle end

Contains:

- total score
- category bars
- strengths
- misses
- replay CTA

## Event Grammar

### Field State Trigger

Display order:

1. stage-side visual pulse
2. temporary label above textbox
3. textbox flavor line
4. textbox explanation line

Example:

1. stage pulse
2. `묶인 회선`
3. `전장에 묶인 회선이 감돈다!`
4. `외부 의존성 때문에 대응 선택지가 제한된다.`

### Interviewer Technique

Display order:

1. opponent sprite nudge
2. temporary label above textbox
3. textbox declaration
4. textbox pressure/question line

Example:

1. opponent nudge
2. `프레셔`
3. `면접관의 프레셔!`
4. `지금은 빠른 우선순위 판단이 중요합니다.`
5. `이 상황에서 가장 먼저 무엇을 확인하시겠습니까?`

### Player Action

Display order:

1. action chosen in grid
2. player sprite nudge
3. temporary label above textbox
4. textbox action declaration
5. result line

## Desktop Wireframe

```text
┌──────────────────────────────────────────────┐
│ Opponent HUD                                │
│  토스뱅크 면접관          Turn 1 / 3         │
├──────────────────────────────────────────────┤
│                                              │
│              [ Opponent Sprite ]             │
│                                              │
│                                  [ Player ]  │
│                                              │
├──────────────────────────────────────────────┤
│ [변경 흔적] [급한 불] [압박감]              │
├──────────────────────────────────────────────┤
│            임시 라벨: 프레셔                │
│ ┌──────────────────────────────────────────┐ │
│ │ 면접관의 프레셔!                         │ │
│ │ 지금은 빠른 우선순위 판단이 중요합니다. │ │
│ │ 이 상황에서 가장 먼저 무엇을 확인...   │ │
│ └──────────────────────────────────────────┘ │
│ [Action Grid / Input / Result Panel]        │
└──────────────────────────────────────────────┘
```

## Mobile Wireframe

```text
┌──────────────────────────────┐
│ 토스뱅크 면접관   1 / 3      │
├──────────────────────────────┤
│      [ Opponent Sprite ]     │
│                      [You]   │
├──────────────────────────────┤
│ [변경 흔적] [급한 불] [+1]   │
├──────────────────────────────┤
│ 임시 라벨: 프레셔            │
│ ┌──────────────────────────┐ │
│ │ 면접관의 프레셔!         │ │
│ │ 지금은 빠른 판단이...    │ │
│ └──────────────────────────┘ │
│ [2x2 Action Grid or Input]   │
└──────────────────────────────┘
```

## Supporting Panels

### Situation Review Panel

Do not place the full incident brief inside the main textbox flow.

Instead provide a separate expandable panel for:

- full incident brief
- main metrics
- constraint
- wrong-move risk

### State Detail Tooltip / Bottom Sheet

Each chip can open:

- state short description
- interview meaning
- strong actions

This is optional for first playable, but the layout should leave room for it later.

## PM Decision

The battle screen wireframe should be built only after the first-playable content contract is frozen.

Reference dependencies:

- [docs/first-playable-content-contract.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/first-playable-content-contract.md)
- [docs/scenario-json-schema-v1.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/scenario-json-schema-v1.md)
