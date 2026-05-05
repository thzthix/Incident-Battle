# Scenario Pool v2

## Goal

Expand the content pool from `10` to `14` scenarios without losing the interview-friendly rhythm.

The bar is:

- realistic enough to feel like a real incident
- narrow enough to answer in a 3-turn battle
- rich enough to support follow-up pressure

## Difficulty Calibration

### Light

- one main fault line
- two metrics at most
- one clear operational constraint
- best for tutorial and early confidence

### Standard

- one core fault plus one conflicting clue
- two to three metrics
- one explicit recovery tradeoff
- best for flagship loops

### Hard

- multiple subsystems or delayed side effects
- two to three metrics plus one hidden risk
- rollback or retry is not obviously safe
- best for advanced rounds

## The 14 Scenario Pool

| No. | Title | Difficulty | Why it belongs | Source flavor |
| --- | --- | --- | --- | --- |
| 1 | 배포 직후 로그인 실패 | Light | teaches impact-first triage, deploy correlation, rollback judgment | Toss-style deploy operations |
| 2 | 마케팅 푸시 후 트래픽 급증 | Standard | teaches bottleneck narrowing and graceful degradation | commerce traffic + AWS overload thinking |
| 3 | 결제 요청 타임아웃 | Standard | teaches dependency split, trust, and data correctness | payment outage patterns |
| 4 | 외부 API 의존 장애 | Light | teaches fallback, partner escalation, and blast-radius control | third-party integration failures |
| 5 | 피크 타임 DB 지연 | Standard | teaches read bottleneck reasoning and safe mitigation | database hot path incidents |
| 6 | 캐시 불일치로 인한 데이터 혼선 | Standard | teaches cache invalidation and correctness-first thinking | KakaoPay local cache, cache consistency |
| 7 | 메시지 큐 적체 | Standard | teaches producer-consumer imbalance and queue prioritization | queue backlog and worker incidents |
| 8 | 검색 인덱스 지연 | Light | teaches severity calibration when core writes still succeed | async indexing pipelines |
| 9 | 비정상 요청 급증과 보호 부재 | Standard | teaches service protection before deep diagnosis | abuse traffic, rate limiting |
| 10 | 레플리카 지연으로 인한 오래된 조회 | Standard | teaches consistency policy and read routing | replica lag and stale reads |
| 11 | 결제 후처리 큐 적체와 중복 리스크 | Standard | teaches lag, idempotency, and safe replay thinking | async post-processing systems |
| 12 | 외부 API 재시도 폭주 | Hard | teaches retries, backoff, jitter, circuit breaking, and queue amplification | AWS retries and dependency isolation |
| 13 | 배포 직후 DB 락 대기 | Standard | teaches write-path lock risk and deploy-time DB triage | migration and lock-wait incidents |
| 14 | 점진 롤아웃 후 DB 부하 | Standard | teaches feature-flag verification and safe rollout expansion | modern release verification |

## New Additions

### 11. 결제 후처리 큐 적체와 중복 리스크

- realistic anchor:
  - sync approval succeeds but async receipt, point accrual, or status sync lags
  - queue depth and consumer lag rise together
- battle value:
  - easy to translate into `대기열 정체`, `급한 불`, `압박감`
  - follow-ups naturally test idempotency and replay safety

### 12. 외부 API 재시도 폭주

- realistic anchor:
  - dependency timeouts cause layered retries
  - our service gets slower even before the dependency fully fails
- battle value:
  - strong delayed-reveal shape
  - great for `묶인 회선`, `과부하`, `확산 조짐`

### 13. 배포 직후 DB 락 대기

- realistic anchor:
  - deploy succeeds, but writes start blocking a few minutes later
  - reads stay mostly normal, which creates a useful contradictory clue
- battle value:
  - clean “what do you verify first?” prompt
  - good practice for safe rollback versus session-kill panic

### 14. 점진 롤아웃 후 DB 부하

- realistic anchor:
  - error rate is still low, but query count, slow query time, or cache hit rate worsens by cohort
  - the release looks “fine” if you only watch one chart
- battle value:
  - teaches release verification instead of binary success/fail thinking
  - works well with `변경 흔적`, `느린 저장소`, `복구 창`

## Source Mapping

- LINE:
  - cache stampede
  - Redis/Lua atomic updates
  - async/event duplication flavor
- AWS Builders' Library:
  - dependency isolation
  - retries and backoff with jitter
- Toss / Danggeun:
  - release safety
  - feature flag and frequent deploy culture
- Kakao / KakaoPay:
  - cache topology
  - customer-view observability
  - distributed read consistency

## PM Recommendation

Freeze the `14` as the content pool, but only promote `5` into first-playable production:

- 배포 직후 로그인 실패
- 마케팅 푸시 후 트래픽 급증
- 결제 요청 타임아웃
- 결제 후처리 큐 적체와 중복 리스크
- 배포 직후 DB 락 대기

This keeps the first slice broad enough to feel real while avoiding too many hard-mode async edge cases in the first build.
