# Scenario Realism Rules

## Goal

Turn broad interview prompts into situations that feel like real production incidents.

Bad:

- `트래픽이 많아졌다면 어떻게 할 건가요?`
- `장애가 났다면 어떻게 대응하나요?`

Good:

- `캠페인 시작 5분 후 트래픽이 평소의 8배로 뛰었고, 응답 시간은 증가했지만 앱 서버 CPU는 높지 않습니다. 대신 DB 읽기 지연과 특정 조회 API의 p95가 급격히 치솟고 있습니다. 지금 무엇을 먼저 확인하시겠습니까?`

## Every Good Scenario Needs 7 Concrete Anchors

### 1. Time Context

The incident should happen at a specific operational moment.

Examples:

- `배포 10분 후`
- `캠페인 시작 5분 후`
- `정산 마감 20분 전`
- `출근 시간대 직전`

Why:

This changes the urgency and the acceptable tradeoff.

### 2. User Impact Surface

State exactly which user flow is hurt.

Examples:

- `모바일 로그인만 실패`
- `신규 가입은 되지만 본인인증 단계에서 멈춤`
- `결제 승인만 느리고 장바구니는 정상`
- `조회 API는 느리지만 쓰기 기능은 정상`

Why:

A strong interview answer starts with blast radius and impact.

### 3. Measurable Symptom

Give one or two concrete signals.

Examples:

- `실패율이 2%에서 18%로 상승`
- `DB read latency가 40ms에서 900ms로 증가`
- `큐 적체가 3만 건까지 증가`
- `외부 API timeout 비율이 25%`

Why:

Without observable signals, the scenario stays vague and schoolbook-like.

### 4. Contradictory Or Incomplete Clue

Add one detail that prevents a trivial answer.

Examples:

- `앱 서버 CPU는 높지 않음`
- `에러는 모바일 앱에 집중되고 웹은 정상`
- `외부 PG도 느리지만 내부 저장소 쓰기도 지연`
- `로그는 부족하지만 고객 문의는 급증`

Why:

Real incidents are rarely clean.

### 5. Constraint

The player needs something that makes the decision harder.

Examples:

- `핵심 시간대라 장애 허용도가 낮음`
- `외부 의존성이라 우리 쪽에서 완전 제어 불가`
- `롤백은 가능하지만 일부 스키마 변경이 이미 반영됨`
- `우회 경로는 있으나 기능 제한이 필요함`

Why:

Constraints create real tradeoffs and better follow-up questions.

### 6. Risk Of The Wrong Move

Show what could get worse.

Examples:

- `무분별한 재시도로 부하 증폭 가능`
- `성급한 롤백 시 데이터 불일치 위험`
- `결제 재처리 시 중복 결제 위험`
- `큐 강제 소거 시 후처리 누락 위험`

Why:

This separates safe answers from hand-wavy ones.

### 7. Next Reveal Material

Prepare one fact for turn 2 and one fact for turn 3.

Examples:

- turn 2: `특정 앱 버전에서만 실패율이 높음`
- turn 2: `최근 설정 변경으로 timeout 값이 짧아짐`
- turn 3: `외부 인증 응답 지연도 함께 확인됨`
- turn 3: `복구 후 고객 문의와 재시도는 여전히 많음`

Why:

A scenario should evolve like a real interview, not dump all facts at once.

## Realism Template

Use this format when writing scenarios:

- `incident_brief`
- `time_context`
- `user_impact`
- `measurable_symptoms`
- `conflicting_clue`
- `constraint`
- `wrong_move_risk`
- `turn_2_reveal`
- `turn_3_reveal`

## Example Upgrades

### Too Generic

`대형 트래픽이 발생하면 어떻게 할 건가요?`

### Better

`마케팅 캠페인 시작 5분 후 트래픽이 평소의 8배로 뛰었습니다. 메인 조회 API의 p95는 120ms에서 1.8s로 상승했고, 앱 서버 CPU는 높지 않지만 DB read latency가 급격히 치솟고 있습니다. 지금은 점심 피크 시간대라 핵심 조회 흐름을 오래 느리게 둘 수 없습니다. 무엇을 먼저 확인하시겠습니까?`

### Too Generic

`배포 후 장애가 나면 어떻게 하죠?`

### Better

`배포 10분 후 모바일 앱 로그인 실패율이 2%에서 18%로 상승했습니다. 웹 로그인은 정상이고, 신규 배포에는 인증 관련 설정 변경이 포함됐습니다. 롤백은 가능하지만 일부 인스턴스에는 새 설정이 이미 반영된 상태입니다. 지금 무엇부터 확인하시겠습니까?`

### Too Generic

`외부 API가 느리면 어떻게 할 건가요?`

### Better

`핵심 시간대에 외부 본인인증 API timeout 비율이 25%까지 올라갔습니다. 신규 가입은 시작되지만 인증 단계에서 멈추고, 고객 문의도 빠르게 늘고 있습니다. 우리 서비스에도 재시도가 쌓이기 시작했는데, 우회 경로는 제한적입니다. 먼저 어떤 기준으로 상황을 나누시겠습니까?`

## Source Patterns To Pull From

Use engineering blogs and postmortem-style writing to extract:

- deploy correlation patterns
- retries amplifying failures
- cache stampede and DB protection
- dependency isolation
- payment correctness and customer trust
- observability gaps
- connection pool exhaustion
- queue backlog and async delay

Examples we already referenced:

- [AWS dependency isolation](https://aws.amazon.com/builders-library/dependency-isolation/)
- [AWS retries and backoff with jitter](https://aws.amazon.com/ar/builders-library/timeouts-retries-and-backoff-with-jitter/?nc1=h_ls)
- [Toss devops pipeline](https://toss.tech/article/slash23-devops)
- [Woowahan payment 장애 대응](https://techblog.woowahan.com/15236/%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%A2/)
- [LINE cache stampede](https://engineering.linecorp.com/ko/blog/atomic-cache-stampede-redis-lua-script)

## Writing Rule

If the scenario can be answered with one broad sentence, it is still too vague.

Good scenarios force the player to answer:

- what changed
- who is hurt
- what signal matters
- what risk makes the next move non-trivial
