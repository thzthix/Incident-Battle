# Scenario Realism Pass Plan

## Goal

Bring all flagship scenarios up to the same realism level as `결제 또는 외부 API 장애`.

## Baseline Standard

Every flagship scenario should include all of these:

- specific operational time
- concrete user flow impact
- at least 2 measurable signals
- 1 contradictory clue
- 1 hard constraint
- 1 explicit wrong-move risk
- clearer turn-2 reveal
- clearer turn-3 reveal

## Rewrite Order

### 1. `배포 직후 로그인 실패`

Add:

- exact deployment timing
- mobile vs web difference
- rollout percentage or config skew
- rollback constraint
- turn-2 reveal about app version or partial instance rollout
- turn-3 reveal about recovery validation and residual risk

### 2. `트래픽 급증으로 DB 과부하`

Add:

- exact campaign timing
- p95, error rate, DB latency signals
- clue that app CPU is not saturated
- constraint around peak hour or key browse flow
- risk from blind retry or cache miss amplification
- turn-2 reveal about hot key or query pattern
- turn-3 reveal about partial protection path

### 3. `결제 또는 외부 API 장애`

Status:

- rewritten to flagship realism baseline

## Writing Rule

If the scenario can be answered with:

- `일단 로그 보겠습니다`
- `서버 늘리겠습니다`
- `롤백하겠습니다`

without needing the player to justify tradeoffs, it is still too vague.

## PM Decision

Do not create new scenarios before these three realism passes are complete.

## Next Content Outputs

1. rewrite `배포 직후 로그인 실패`
2. rewrite `트래픽 급증으로 DB 과부하`
3. normalize all three into shared JSON-ready fields
4. extract reusable reveal patterns for future scenario writing
