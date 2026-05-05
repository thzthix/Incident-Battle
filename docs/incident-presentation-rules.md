# Incident Presentation Rules

## Goal

Show realistic production incidents in a way that still feels like a battle.

The player should not receive one large paragraph first.
The player should receive the incident as `battle beats`, then be able to reopen the full brief.

## Reveal Structure

Split every long incident brief into these five battle beats:

1. `사건 점화`
What just happened.

2. `핵심 사용자 영향`
Which user flow is actually hurting.

3. `관측 단서`
One concrete metric or symptom.

4. `가설을 흔드는 단서`
One contradictory clue that prevents a trivial answer.

5. `제약 조건`
Why the player cannot take forever.

Then ask the question.

## Maximum Lines Before The Question

- tutorial: `3-4` lines
- normal scenario: `4` lines
- flagship scenario: `5` lines
- hard limit: `6` lines

If the player reads more than that before acting, the battle feeling drops.

## What Goes In The Full Brief

The `상황 다시 보기` panel should contain:

- the full incident paragraph
- time context
- affected user flow
- 2-4 concrete metrics
- active state meanings in plain language
- the interviewer’s current question

It should not contain:

- recommended actions
- grading hints
- answer keys
- coaching feedback

## UI Label

Default label:

- `상황 다시 보기`

Secondary acceptable labels:

- `사건 브리프`
- `전장 분석`

## Example Decomposition

### Full Brief

`마케팅 캠페인 시작 5분 후 트래픽이 평소의 8배로 뛰었습니다. 메인 조회 API의 p95는 120ms에서 1.8초로 상승했고, 앱 서버 CPU는 높지 않지만 DB read latency가 급격히 치솟고 있습니다. 지금은 점심 피크 시간대라 핵심 조회 흐름을 오래 느리게 둘 수 없습니다. 무엇을 먼저 확인하시겠습니까?`

### Battle Beats

- `전장에 과부하가 몰아친다!`
- `캠페인 시작 5분 만에 트래픽이 평소의 8배로 뛰었다.`

- `급한 불이 번지고 있다!`
- `메인 조회 흐름이 느려지며 사용자 체감이 커지고 있다.`

- `관측된 수치가 드러났다!`
- `메인 조회 API의 p95가 120ms에서 1.8초로 상승했다.`

- `느린 저장소가 드러났다!`
- `앱 서버 CPU는 높지 않지만 DB read latency가 급격히 치솟고 있다.`

- `핵심 시간대다!`
- `지금은 점심 피크 시간대라 오래 지연을 방치하기 어렵다.`

- `면접관의 추궁!`
- `\"이 상황에서 가장 먼저 무엇을 확인하시겠습니까?\"`
