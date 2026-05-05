# First Playable Scenarios v1

## Purpose

This pack freezes the `first 5 scenarios` for the first playable build.

These are the scenarios we should treat as production-priority content before expanding the rest of the `14-scenario pool`.

## The 5 Scenarios

### 1. 배포 직후 로그인 실패

- file:
  - [docs/scenario-battle-login-deploy.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/scenario-battle-login-deploy.md)
- why it is in:
  - best tutorial-to-standard bridge
  - teaches impact-first reasoning
  - deploy correlation is easy to understand

### 2. 트래픽 급증으로 DB 과부하

- file:
  - [docs/scenario-traffic-spike-db-overload.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/scenario-traffic-spike-db-overload.md)
- why it is in:
  - teaches bottleneck narrowing
  - strong battle-state rhythm
  - realistic but still accessible

### 3. 결제 또는 외부 API 장애

- file:
  - [docs/scenario-script-payment-api.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/scenario-script-payment-api.md)
- why it is in:
  - teaches dependency split
  - forces correctness and trust thinking
  - strongest customer-impact scenario

### 4. 결제 후처리 큐 적체와 중복 리스크

- file:
  - [docs/scenario-async-postprocess-queue.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/scenario-async-postprocess-queue.md)
- why it is in:
  - adds async reasoning without requiring deep infra knowledge
  - introduces lag, backlog, idempotency, replay safety
  - very interview-worthy and very gameable

### 5. 배포 직후 DB 락 대기

- file:
  - [docs/scenario-deploy-db-lockwait.md](/Users/seoha/Documents/Codex/2026-05-05-cs/docs/scenario-deploy-db-lockwait.md)
- why it is in:
  - adds realistic deploy/database risk
  - trains safe rollback judgment
  - strong contradiction pattern: reads normal, writes bad

## Shared Writing Rules

All five scenarios should follow the same density rule:

- first brief:
  - `5~6` clues
  - `2~3` numeric signals
  - `1` contradictory clue
  - `1` constraint
  - `1` wrong-move risk
- turn cadence:
  - turn 1: what to check first
  - turn 2: what to do now
  - turn 3: what to verify and change next
- follow-up budget:
  - `3` total
  - `1` per turn

## Difficulty Mix

- tutorial-friendly:
  - `배포 직후 로그인 실패`
- standard core:
  - `트래픽 급증으로 DB 과부하`
  - `결제 또는 외부 API 장애`
  - `결제 후처리 큐 적체와 중복 리스크`
  - `배포 직후 DB 락 대기`

This is a good first playable mix because:

- no scenario is too abstract
- no scenario requires rare vendor-specific knowledge
- the set covers deploy, traffic, payment, async, and DB lock risk

## Implementation Order

If we build them one by one, this is the best order:

1. `배포 직후 로그인 실패`
2. `트래픽 급증으로 DB 과부하`
3. `결제 또는 외부 API 장애`
4. `결제 후처리 큐 적체와 중복 리스크`
5. `배포 직후 DB 락 대기`

## PM Recommendation

Do not write more new scenarios before these five are:

- battle-ready
- JSON-ready
- follow-up-ready
- scoring-ready

Once these five are normalized, then the rest of the `14-scenario pool` can be promoted into production.
