# Game Design

## One-Line Pitch

`Interview Battle` is a 3-turn retro battle web game where the player survives CS scenario interview pressure by reading the field, choosing the right response order, and explaining it clearly.

## Player Fantasy

The player should feel:

- calm under pressure
- structured in chaos
- able to read the field before acting
- able to defend against follow-up questions

This is not a trivia quiz. It is a battle-shaped interview trainer.

## Core Thesis

Scenario questions feel hard because they combine:

- ambiguity
- pressure
- incomplete information
- prioritization
- tradeoffs

The game should train those exact muscles.

## MVP Shape

- one battle = one incident
- three turns per battle
- two starting field states
- zero or one new field state per turn
- one action per turn
- one or two supporting sentences from the player
- immediate turn feedback
- final coaching report

## Turn Structure

### Turn 1: Triage

The player answers:

- what is happening
- who is affected
- what should be checked first

### Turn 2: Decision

The player answers:

- what to do next
- why that action now
- whether to mitigate, rollback, isolate, or inspect further

### Turn 3: Stabilize

The player answers:

- how to confirm recovery
- how to communicate
- how to prevent recurrence

## Core Loop

1. Battle intro
2. Incident brief
3. Field states appear
4. Interviewer asks a question
5. Player selects one action
6. Player adds one or two sentences
7. System evaluates the turn
8. New information or a new state appears
9. Repeat until turn three
10. Show the final battle report

## What Makes It Feel Like A Game

The game feeling comes from:

- stacked field states
- actions with context-dependent strength
- short textbox cadence
- battle presentation and pacing
- recoverable mistakes instead of hard game over

The game does not need:

- deep story branches
- overworld exploration
- inventory systems
- large progression trees

## Failure Model

The player can stumble without instantly losing.

Recommended failure states:

- `압박 붕괴`: priority is unclear
- `오판 고착`: the player ignores new evidence
- `과잉 대응`: risky action without justification
- `소통 부재`: no mention of impact or communication

These should reduce score and trigger coaching, not end the run.

## Replayability

Replayability should come from state combinations, not giant branches.

- alternate starting state pairs within the same scenario
- small wording variants in follow-up questions
- one optional mid-battle revealed state from a small pool
- end-of-battle hints that suggest a different valid route

## MVP Content Scope

- 5 polished scenarios
- 10 total scenario seeds
- 12 field states
- 8 player actions
- 1 tutorial battle
- 1 opponent visual theme

## MVP Modes

Launch with:

- `연습전`: pick a scenario and play one battle
- `도감`: browse battle states and actions

Defer:

- `승급전`
- campaign mode
- adaptive difficulty

## Tone

Recommended tone balance:

- 70 percent serious coaching
- 30 percent playful battle parody

The player should smile, but still feel that the training is useful.
