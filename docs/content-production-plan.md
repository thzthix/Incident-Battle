# Content Production Plan

## Scenario Source Queue

Use multiple source families so the scenarios do not all feel like the same company:

- Toss engineering and product reliability topics
- Kakao engineering and scale topics
- Naver D2 engineering topics
- Woowahan engineering and delivery platform topics
- Danggeun engineering and real-time/community topics
- public SRE and incident writeups

## Concrete Source References

Start from these public references:

- [Toss slash23 devops](https://toss.tech/article/slash23-devops)
- [Toss high-TPS cache case](https://toss.tech/article/34481)
- [Toss workload isolation / StarRocks](https://toss.tech/article/operating-starrocks-1)
- [Toss monorepo pipeline](https://toss.tech/article/monorepo-pipeline)
- [Woowahan Config Checker](https://techblog.woowahan.com/7242/)
- [Woowahan payment 장애 대응](https://techblog.woowahan.com/15236/%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%A2/)
- [Woowahan first action](https://techblog.woowahan.com/25189/)
- [Woowahan HikariCP case](https://techblog.woowahan.com/2663/)
- [LINE cache stampede with Redis/Lua](https://engineering.linecorp.com/ko/blog/atomic-cache-stampede-redis-lua-script)
- [LINE Redis Streams migration](https://engineering.linecorp.com/ja/blog/redis-pub_Sub-redis-streams)
- [LINE profiling and latency tracing](https://engineering.linecorp.com/ja/blog/pyroscope-continuous-profiling)
- [Danggeun Pay FDS architecture](https://medium.com/daangn/the-journey-to-daangn-pays-ai-powered-fds-from-building-a-rule-engine-to-applying-llms-695c58a78622)
- [AWS retries and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/)
- [AWS dependency isolation](https://aws.amazon.com/builders-library/dependency-isolation/)

## What To Extract From A Source

Do not copy the article.
Extract the reusable interview pattern.

For each source, pull:

- what broke
- who was impacted
- what made the diagnosis hard
- what made the recovery urgent
- what tradeoff mattered

## Transform Pipeline

1. source incident
2. interview scenario brief
3. battle states
4. turn questions
5. candidate actions
6. follow-up questions
7. coaching notes

## Priority Scenario Set

### Scenario 1

`배포 직후 로그인 실패`

Why first:

- easiest tutorial candidate
- teaches impact first, deploy correlation, rollback judgment

Likely states:

- `변경 흔적`
- `압박감`
- `급한 불`
- optional reveal: `복구 창`

### Scenario 2

`마케팅 푸시 후 트래픽 급증`

Why second:

- teaches bottleneck thinking and graceful degradation

Likely states:

- `과부하`
- `핵심 시간대`
- optional reveal: `확산 조짐`

### Scenario 3

`결제 또는 외부 API 장애`

Why third:

- teaches dependency reasoning, customer trust, fallback

Likely states:

- `묶인 회선`
- `급한 불`
- `불만 누적`
- optional reveal: `느린 저장소`

## Expanded Scenario Pool v2

The content pool is now `14` scenarios.

Keep the early production set focused, but source and normalize all 14:

- `배포 직후 로그인 실패`
- `마케팅 푸시 후 트래픽 급증`
- `결제 요청 타임아웃`
- `외부 API 의존 장애`
- `피크 타임 DB 지연`
- `캐시 불일치로 인한 데이터 혼선`
- `메시지 큐 적체`
- `검색 인덱스 지연`
- `비정상 요청 급증과 보호 부재`
- `레플리카 지연으로 인한 오래된 조회`
- `결제 후처리 큐 적체와 중복 리스크`
- `외부 API 재시도 폭주`
- `배포 직후 DB 락 대기`
- `점진 롤아웃 후 DB 부하`

## First Playable Candidates

These are the best five content candidates for early production:

- `배포 직후 로그인 실패`
- `마케팅 푸시 후 트래픽 급증`
- `결제 요청 타임아웃`
- `결제 후처리 큐 적체와 중복 리스크`
- `배포 직후 DB 락 대기`

These five were chosen because:

- user impact is easy to understand
- battle-state combinations are strong
- follow-up questions are easy to generate
- they cover deploy, traffic, payment, async, and DB risk in one slice

## Writing Template For Each Scenario

Every scenario must include:

- `title`
- `incident_brief`
- `starting_states`
- `turn_1_prompt`
- `turn_1_candidate_actions`
- `turn_1_followups`
- `turn_2_reveal`
- `turn_2_prompt`
- `turn_2_candidate_actions`
- `turn_2_followups`
- `turn_3_reveal`
- `turn_3_prompt`
- `turn_3_candidate_actions`
- `strong_answer_points`
- `common_mistakes`
- `final_coaching`

## Follow-Up Question Taxonomy

Use these six types:

- priority check
- evidence check
- branch switch
- added constraint
- risk check
- communication check

## State And Action Freeze

### Keep 12 States

- `압박감`
- `변경 흔적`
- `흐린 로그`
- `묶인 회선`
- `급한 불`
- `확산 조짐`
- `핵심 시간대`
- `과부하`
- `느린 저장소`
- `가설 붕괴`
- `복구 창`
- `불만 누적`

### Keep 10 Actions

- `범위 파악`
- `변경 추적`
- `관측 세우기`
- `의존성 점검`
- `우선순위 선언`
- `원인 분리`
- `즉시 우회`
- `되돌리기`
- `우선 차단`
- `상황 공유`

## Turn Cadence Rule

Every turn should feel like:

1. battle state triggers
2. short explanation line
3. interviewer attack question
4. player action selection
5. player short explanation
6. result line
7. follow-up or reveal
