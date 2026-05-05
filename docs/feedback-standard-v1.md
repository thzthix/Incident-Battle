# Feedback Standard v1

## Purpose

Define what `good feedback` means for this project.

This matters because the product itself is a feedback-heavy training tool.
If our internal review feedback is weak, the product feedback will also drift weak.

## Core Principle

Good feedback must do three things:

1. diagnose the issue
2. explain the consequence
3. show the repair direction

If one of these is missing, the feedback is not complete.

## Required Feedback Structure

Every meaningful review should try to produce:

### 1. What Worked

At least `1~3` concrete strengths.

Good:

- `사용자 영향부터 본 점이 좋습니다.`
- `상태 reveal과 질문의 순서가 전투 문법에 잘 맞습니다.`

Bad:

- `괜찮음`

### 2. What Failed

Name the exact problem.

Good:

- `시작 브리프가 너무 추상적이라 실제 운영 사고처럼 읽히지 않습니다.`

Bad:

- `별로임`

### 3. Why It Matters

Tie the issue back to product goals.

Good:

- `이 프로젝트는 면접 훈련 도구이기 때문에, 사용자가 우선순위를 판단할 단서가 부족하면 학습 효과가 떨어집니다.`

Bad:

- `그냥 아쉽습니다`

### 4. How To Fix It

Give specific revision guidance.

Good:

- `시간 맥락 1개, 사용자 영향 1개, 숫자 지표 2개, 상충 단서 1개를 시작 브리프에 추가하세요.`

Bad:

- `더 다듬으세요`

### 5. Example Repair Direction

When possible, provide a model line or replacement direction.

Good:

- `예: "배포 10분 후 모바일 로그인 실패율이 2%에서 18%로 상승했습니다. 웹은 정상입니다."처럼 구체화하세요.`

## Feedback Types We Need

### Scenario Feedback

Must mention:

- realism
- clarity
- battle pacing
- coaching value

### Naming Feedback

Must mention:

- immediate meaning
- flavor
- confusion risk

### UX Feedback

Must mention:

- reading order
- action clarity
- mobile burden

### Implementation Feedback

Must mention:

- scope fit
- complexity risk
- state ownership
- testability

## Tone Rule

Feedback should be:

- direct
- specific
- non-shaming
- revision-friendly

Do not write:

- sarcastic comments
- vague dismissal
- ego-driven language

## Feedback Depth Rule

### For passing work

Keep feedback compact:

- `1~3 strengths`
- `0~2 minor improvements`

### For failing work

Be explicit:

- `top 3 failures`
- `required fixes`
- `one rewrite path`

## Example Judge Output

### Pass Example

- `총점: 96`
- `강점: 시작 브리프가 구체적이고, turn 2 reveal이 가설 전환을 잘 만듭니다.`
- `보완: turn 3 follow-up만 조금 더 짧게 줄이면 모바일 텍스트박스에서 읽기 좋아집니다.`

### Revise Example

- `총점: 88`
- `문제 1: opening brief에 상충 단서가 없어 원인 분리가 약합니다.`
- `문제 2: turn 2 질문이 너무 넓어 즉시 대응보다 전체 해결책을 유도합니다.`
- `문제 3: final coaching이 추상적입니다.`
- `필수 수정: CPU는 안정적이지만 특정 지표만 튄다는 단서를 넣고, turn 2 질문을 '지금 무엇을 먼저 하겠는가' 형식으로 바꾸며, final coaching에 답변 순서를 명시하세요.`

## Product Connection

This project’s final product should also follow the same philosophy:

- do not only score the player
- explain what was good
- explain what was missing
- show how to answer better next time

Internal review quality should model product coaching quality.
