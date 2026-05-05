# Battle Animation Spec

## Goal

Make the battle feel strongly inspired by DS-era monster battle pacing without copying copyrighted assets.

The target is:

- fast to read
- emotionally punchy
- lightweight to implement
- usable on both desktop and mobile

## Core Principle

The feeling should come from:

- textbox cadence
- state reveal rhythm
- small camera nudges
- sprite bounce and idle motion
- short confirm and result timing

Not from:

- copied sprites
- copied background art
- long flashy attack cutscenes

## Animation Principles

- keep each animation short and clear
- show one meaning at a time
- favor `transform` and `opacity`
- keep the camera subtle
- let text set the beat
- keep sprites alive with tiny idle motion

## Layer Model

Use four layers:

1. background
2. stage platform
3. sprites
4. UI and effects

## Intro Sequence

### Purpose

Signal that a battle has started and establish the retro battle grammar immediately.

For this project, the intro should parody the `trainer sends something out` feeling without literally copying creature summon logic.

### Sequence

1. background fade in `250ms`
2. stage platforms slide in `180ms`
3. tiny camera push toward opponent `220ms`
4. opponent sprite enters and makes a short throw motion `220ms`
5. `질문볼` or `시나리오 캡슐` arc crosses the stage `260ms`
6. impact burst creates a short field flare `180ms`
7. opponent sprite settles with one bounce `160ms`
8. textbox appears `120ms`
9. intro line types:
   `OOO 면접관이 승부를 걸어왔다!`

### Visual Notes

- zoom should be tiny, around `1.00 -> 1.06 -> 1.00`
- optional screen shake: `40ms x 2`
- player sprite mostly stays in idle pose

### What The Ball Means

Do not make the ball release a monster.

Instead, the thrown object releases:

- the incident pressure
- the opening field conditions
- the battle atmosphere

Recommended interpretation:

- opponent throws `질문볼`
- it bursts into `상황 파편`, `데이터 노이즈`, or `전장 효과`
- the battle states are then revealed through the textbox rhythm

This keeps the parody readable without needing a separate creature layer.

### Who Throws

For first playable:

- the opponent throws at battle start
- the player does not throw a matching ball during intro
- the player's side answers through move selection and sprite nudge

Why:

- cleaner visually
- less asset work
- keeps the interviewer as the aggressor and the player as the responder

Later expansion option:

- the player can throw a small `답변칩` or `대응 패스` style object when locking an action
- do not make this mandatory in v1

## State Reveal Sequence

### Purpose

States should feel like field effects, not plain tags.

This sequence should specifically mirror the classic battle grammar:

- a short visual effect appears near the battlefield first
- the effect label appears above the textbox for a moment
- the textbox then explains what just happened
- only after that does control move to the player again

### Sequence

1. mini state effect appears near stage center or chip row `220-320ms`
2. temporary state label appears just above the textbox `180ms`
3. active state chip slides in or pulses `180ms`
4. textbox types one explanation line
5. temporary state label fades out

Recommended text order:

1. `전장에 묶인 회선이 감돈다!`
2. `외부 인증 응답이 느려 우리 선택지가 제한된다.`

The first line is flavor.
The second line is meaning.

### Example State Effects

- `변경 흔적`: cold scan-line streak
- `압박감`: red vignette pulse
- `흐린 로그`: glitch flicker or noise shimmer
- `묶인 회선`: thin line lock effect
- `급한 불`: warm orange flash

### Rules

- reveal states one after another, not all at once
- highlight at most 2 states per turn
- total reveal time should stay under 2 seconds
- the temporary state label above the textbox should never stack more than one at a time
- the textbox is the source of truth; upper labels are dramatic cues, not the only explanation

## Textbox-First Battle Grammar

### Purpose

Recreate the feeling that the battle is being narrated step by step.

### Rule

Anything important must eventually be confirmed in the textbox.

That includes:

- battle start
- state trigger
- opponent move
- player move
- result line
- follow-up question

### Display Order By Event Type

#### Battle Start

1. opponent sprite entrance
2. textbox:
   `OOO 면접관이 승부를 걸어왔다!`

#### Field State Trigger

1. small field effect near battle stage
2. temporary label above textbox:
   `묶인 회선`
3. textbox flavor line:
   `전장에 묶인 회선이 감돈다!`
4. textbox explanation line:
   `외부 의존성 때문에 대응 선택지가 제한된다.`

#### Opponent Technique

1. opponent nudge / effect burst
2. temporary label above textbox:
   `프레셔`
3. textbox flavor line:
   `면접관의 프레셔!`
4. textbox question or pressure line

#### Player Technique

1. chosen move highlight
2. player nudge / move VFX
3. temporary label above textbox:
   `범위 파악`
4. textbox:
   `너는 범위 파악을 꺼냈다!`

Optional later flourish:

5. tiny `답변칩` flick or card-like streak from player side

Keep this optional in first playable.

#### Result

1. state chip reaction
2. textbox result line:
   `효과는 굉장했다!`
3. textbox coach line

Recommended result flavor set:

- strong: `효과는 굉장했다!`
- neutral: `나쁘지 않은 판단이다.`
- weak: `효과가 별로인 것 같다...`

### Important Constraint

Do not show long explanatory copy above the textbox.

The area above the textbox is only for:

- short state labels
- move names
- tiny one-word result accents

The explanation belongs in the textbox.

## Action Selection

### Menu Feel

- 2x2 action grid
- current action gets glow and slight lift
- hover/focus animation `120ms`
- cursor move feel should be crisp, not floaty

### Menu Entrance

- 4 actions rise from below by `16px`
- stagger by `120ms`
- total entrance time `420-520ms`

### Confirm

1. chosen action stays bright
2. others dim `120ms`
3. textbox says:
   `너는 범위 파악을 꺼냈다!`
4. player sprite nudges forward `90ms`
5. action name flash appears `160ms`

## Answer Input Motion

- input panel expands above textbox `180ms`
- use `fade + height expand`
- do not over-animate the text field
- placeholder should teach behavior:
  `왜 이 행동을 먼저 쓰는지 1~2문장으로 설명하세요.`

## Submit / Judge Buffer

### Purpose

Hide scoring delay and create tension.

### Sequence

1. input locks
2. submit button changes to:
   `면접관이 판단 중...`
3. opponent sprite blinks once
4. state chips pulse softly
5. wait `700-1100ms`

## Action Fire

### Base Sequence

1. textbox repeats chosen action
2. player sprite moves forward `10px` then returns
3. tiny screen shake `180ms`
4. one light effect based on action family

### Action Family Effects

- analysis actions:
  thin scan-line sweep
- mitigation actions:
  shield arc flash
- communication actions:
  signal pulse ripple
- rollback actions:
  reverse streak / rewind trail

## Result Animation

### Strong Result

1. state chip flashes
2. opponent sprite nudges back `70ms`
3. 1-frame white flash
4. result text pops:
   `효과는 굉장했다!`
5. coach line appears

### Neutral Result

- smaller shake
- softer chip pulse
- result text:
  `나쁘지 않은 판단이다.`

### Weak Result

- almost no sprite reaction
- gray flash
- result text:
  `효과가 별로인 것 같다...`

### Order

Always show:

1. result line
2. short coach line
3. missed point

## Follow-up Reveal

### Purpose

Make the follow-up question feel like a new attack.

### Sequence

1. short pause `250ms`
2. opponent idle stops
3. tiny camera pull toward opponent `180ms`
4. textbox changes
5. line appears:
   `면접관의 되물림!`
6. actual follow-up types in after a beat

### Rule

- one follow-up max per turn
- use it to strengthen the next turn context
- MVP should not open an extra free-text turn here

## State Update Motion

### New State

- chip slides in from the side `240ms`
- line:
  `새로운 상태가 드러났다!`

### Weakened State

- desaturate
- lower opacity to around `55%`

### Removed State

- shrink out `180ms`

## Turn Timing Budget

### Automatic Motion Budget

- around `4.5-6.5s` per turn excluding user reading and typing

### Total Feel

- fast player: `10-14s` per turn
- slower player: `16-22s` per turn

## Key Timing Defaults

- hover: `80-120ms`
- confirm: `120ms`
- one state reveal: `400-700ms`
- action confirm to result: `600-900ms`
- follow-up reveal: `700-1100ms`
- one textbox line typing: `0.9-1.4s`

## Mobile Constraints

- state chips: show max 3 directly
- 4th state collapses into `+1`
- action buttons minimum height `48px`
- at most 2 simultaneous animated layers
- keep screen shake very subtle
- text per message should stay within 2 short lines

## Must Keep For The Feel

- bottom full-width textbox
- turn-start banner
- state-first reveal
- 2x2 move menu
- tiny sprite bounce
- short confirm nudge
- result text pop
- short phase pauses

## Safe Simplifications

- no long attack cinematics
- no complex 3D camera motion
- no per-action custom particle system
- no large parallax stack
- no giant unique animation for every state

## Safe Direction

Use `DPPT-like battle grammar`, not direct reproduction.

That means:

- similar pacing
- similar information order
- similar emotional rhythm

But:

- original sprites
- original backgrounds
- original UI boxes and icons

## Next Useful Spec

After this doc, the most useful follow-up is:

- `10 actions x animation family mapping`
- or `12 states x mini visual effect mapping`
