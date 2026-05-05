# User Scenario And Follow-Up Rules

## Why This Document Exists

The next design step is not more brainstorming.
It is making sure a first-time player can actually finish one battle without confusion.

This document fixes:

- the user scenario
- the expected play session shape
- how many follow-up questions a battle should use
- what each sub-role owns

## Primary User Scenario

### User

`CS 시나리오 질문에 약한 취업 준비생`

### Need

- wants a repeatable way to practice scenario interviews
- freezes when asked follow-up questions
- knows some CS terms but struggles to answer in order

### Trigger

The user opens the app because:

- they have an interview soon
- they want a fast practice run, not a long lesson
- they want feedback on what to say first

### Success Moment

After one battle, the user should think:

`아, 이런 상황에서는 영향부터 보고, 그 다음 배포나 의존성을 확인한다고 말하면 되는구나.`

## MVP Session Shape

Recommended:

- one session = `one battle`
- one battle = `three turns`
- one battle target time = `4 to 6 minutes`
- one turn answer = `one action + 1 to 2 sentences`

This keeps:

- battle rhythm
- interview usefulness
- replayability

## Follow-Up Question Rule

### Default Count

- total follow-up questions per battle: `3`

### Distribution

- turn 1: `1`
- turn 2: `1`
- turn 3: `1`

### Why 3 Is The Default

- `1` is too shallow for a scenario interview
- `2` is acceptable for a short tutorial
- `3` feels like a real scenario interview without dragging
- `4+` makes the battle sluggish for MVP

### Allowed Variants

- tutorial battle: `2 total`
- standard battle: `3 total`
- hard mode later: `4 total`

## Follow-Up Question Types

Each battle should mix these types instead of repeating the same kind:

- `우선순위 검증형`
- `근거 요구형`
- `분기 전환형`
- `제약 추가형`
- `리스크 점검형`
- `커뮤니케이션 확장형`

MVP recommendation:

- turn 1 uses `우선순위 검증형`
- turn 2 uses `분기 전환형` or `리스크 점검형`
- turn 3 uses `커뮤니케이션 확장형`

## Turn Readability Rule

The player should always know:

- what changed
- what the interviewer is asking now
- what kind of answer is expected

So every turn should show:

1. state trigger
2. one-line explanation
3. interviewer attack line
4. 4 suggested actions
5. short input box
6. one follow-up after evaluation

## Do We Need A User Scenario?

Yes.

Not a giant PM document, just one clear user scenario is enough for MVP.
Without it, the game can drift into:

- a parody toy with weak coaching
- a text-heavy interview simulator with weak game feel

This project needs a strong center:

`short repeatable battle practice for people who freeze on scenario questions`

## Role Split Check

The current role split is valid.
It should be kept this way:

### `시나리오 수집가`

- mines public engineering posts
- extracts reusable incident patterns
- writes short incident briefs

### `시니어 면접관`

- defines strong answer spine
- writes fair but sharp follow-ups
- marks common mistakes

### `포켓몬 오타쿠 시스템 디자이너`

- translates incidents into battle states
- shapes action vocabulary
- keeps battle cadence and flavor

### `게임 기획자`

- fixes turn count, pacing, and scope
- protects MVP from overgrowth

### `UX 라이터`

- writes textbox lines, explanations, coaching lines
- keeps tone consistent

### `디자이너 / 포켓몬풍 아트 디렉터`

- defines the Sinnoh-inspired but original visual direction
- plans sprite, HUD, textbox, and background style

### `시니어 개발자`

- turns the design into data models and implementation boundaries
- keeps asset swap, evaluation, and UI flow practical

## What We Should Do Next

Now that the first flagship scenario is written, the next correct design step is:

1. write `트래픽 급증으로 DB 과부하`
2. write `결제 또는 외부 API 장애`
3. freeze the shared follow-up and scoring template
4. design the single-battle screen using these scripts

That is enough design to start a first playable spec safely.
