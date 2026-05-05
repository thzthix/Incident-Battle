# Scenario Script

## Role

`flagship scenario writer #5`

## Scenario Title

`배포 직후 DB 락 대기`

## Battle Goal

플레이어는 배포 직후 쓰기 경로가 막히는 상황에서:

- 읽기와 쓰기 영향 범위를 분리하고
- 최근 배포, migration, 쿼리 변경의 연관성을 빠르게 좁히고
- 복구 우선 판단과 안전한 롤백 기준을 설명하며
- DB 락 문제를 공포감만으로 다루지 않고 검증 가능한 지표로 말해야 한다

이 시나리오는 `DB가 느리니 서버를 늘리겠다`거나 `세션을 다 죽이겠다`보다 `영향 파악 -> 배포 연관성 확인 -> 안전한 완화 -> 배포 원칙 개선`을 훈련시킨다.

## Incident Brief

`평일 오전 10시 18분, 배포 완료 8분 후부터 주문 수정과 주소 변경 같은 쓰기 API의 p95가 90ms에서 2.7초까지 치솟았습니다. 조회 API는 대부분 정상이고 앱 서버 CPU도 35% 수준인데, DB lock wait time과 blocked session 수만 빠르게 늘고 있습니다. 이번 배포에는 신규 인덱스 추가와 주문 메모 컬럼 확장 migration이 포함됐고, 일부 pod는 이미 새 쿼리 경로를 타고 있습니다. 지금은 오전 주문이 몰리는 시간대라 쓰기 기능을 오래 불안정하게 둘 수 없고, 성급한 전체 재시작이나 세션 kill은 더 큰 락 경합을 만들 수 있습니다. 이 상황에서 무엇을 먼저 확인하시겠습니까?`

## Realism Anchors

### Time Context

- `평일 오전 10시 18분`
- `배포 완료 8분 후`
- `오전 주문 변경 피크 시간대`

### User Impact Surface

- `주문 수정`
- `배송지 변경`
- `결제 후 부가정보 저장`

핵심은 조회는 대부분 정상인데 `일부 쓰기 흐름만 뚜렷하게 느려지는` 패턴이라는 점이다.

### Measurable Symptoms

- 쓰기 API p95: `90ms -> 2.7s`
- lock wait time: `거의 0 -> 1.8s`
- blocked sessions: `3 -> 147`
- deadlock count: `분당 0 -> 11`
- 앱 서버 CPU: `35% 수준 유지`

### Contradictory Clues

- 조회 API는 대부분 정상이다
- 앱 서버 CPU와 메모리는 안정적이다
- DB connection 수는 높지만 아직 max를 꽉 채우진 않았다

즉 `전체 시스템 과부하`보다는 `특정 쓰기 경로의 lock contention` 가능성이 더 높다.

### Constraint

- 주문 변경이 몰리는 시간대라 쓰기 기능 불안정을 오래 두기 어렵다
- 일부 pod는 이미 새 스키마를 전제로 동작하고 있어 앱만 단순 롤백하면 불일치가 날 수 있다
- migration은 중간 상태일 수 있어 무조건 중단하거나 재실행하는 것도 위험하다

### Risk Of The Wrong Move

- 세션을 무작정 kill하면 재시도 폭증과 더 큰 lock storm을 만들 수 있다
- 앱만 롤백하면 신구 스키마 호환성 문제를 키울 수 있다
- DB 원인 확인 없이 서버 재시작을 반복하면 복구가 더 늦어진다

## Starting States

### `변경 흔적`

- 짧은 설명: 최근 변경의 여파가 강하게 남아 있다.
- 면접 의미: 최근 migration, 인덱스, 쿼리 경로 변경을 먼저 대조해야 한다.

### `느린 저장소`

- 짧은 설명: 저장 계층이 특정 흐름을 붙잡고 있다.
- 면접 의미: 읽기 전체 장애가 아니라 어떤 write path가 막히는지 먼저 좁혀야 한다.

### `압박감`

- 짧은 설명: 빠른 복구 판단이 필요하다.
- 면접 의미: 근본 원인 분석보다 복구와 안전성 기준을 먼저 말해야 한다.

## Turn 1

### State Reveal

- `릴리즈 검증 면접관이 승부를 걸어왔다!`
- `변경 흔적이 짙게 남아 있다!`
- `배포 8분 뒤부터 특정 쓰기 API만 급격히 느려지고 있다.`
- `느린 저장소가 발목을 잡는다!`
- `lock wait time과 blocked session 수가 빠르게 늘고 있다.`
- `압박감이 전장을 조인다!`
- `주문 변경 흐름을 오래 막아둘 수는 없다.`

### Interviewer Attack

- `면접관의 추궁!`
- `"이 상황에서 가장 먼저 무엇을 확인하시겠습니까? 그리고 왜 그 순서가 맞다고 보시나요?"`

### Candidate Actions

- `변경 추적`
- `범위 파악`
- `의존성 점검`
- `원인 분리`

### Strong Player Answer Example

`우선 느려진 쓰기 API가 어떤 테이블과 쿼리 경로를 공통으로 쓰는지부터 확인하겠습니다. 조회는 정상이고 배포 직후부터 lock wait만 늘었다면, 이번 배포에 포함된 migration이나 인덱스 추가, 새 write 쿼리 경로와의 연관성을 먼저 대조해 읽기 전체 장애가 아니라 특정 write contention인지 좁히겠습니다.`

### Why This Is Strong

- 읽기/쓰기 영향 범위를 분리한다
- 배포 직후라는 단서를 제대로 활용한다
- lock wait를 근거로 특정 write path를 좁혀 본다

### Common Mistakes

- 앱 서버 증설부터 말한다
- 조회도 느린지 확인하지 않고 전체 DB 장애로 단정한다
- migration, 인덱스, query plan 변경을 언급하지 않는다
- 세션 kill이나 재시작을 너무 빨리 제안한다

### Follow-up Question 1

- `면접관의 되물림!`
- `"최근 변경과 연관이 있다면, 앱 코드 변경과 DB migration 중 어느 쪽을 먼저 의심하고 어떻게 구분하시겠습니까?"`

## Turn 2

### New Reveal

- `추가 정보가 드러났다!`
- `신규 주문 메모 컬럼을 채우는 update 쿼리에서 row lock 대기가 집중된다.`
- `복구 창이 흔들리며 열린다!`
- `주문 메모 기능은 feature flag로 일부 끌 수 있고, migration 작업도 일시 중단은 가능하다.`
- `가설이 더 선명해진다!`
- `구버전 pod는 비교적 정상인데 새 쿼리 경로를 탄 pod에서 지연이 더 심하다.`

### Interviewer Attack

- `면접관의 압박!`
- `"원인이 최근 변경과 강하게 연결되어 보입니다. 지금 어떤 복구 판단을 하시겠습니까?"`

### Candidate Actions

- `되돌리기`
- `우선 차단`
- `상황 공유`
- `변경 추적`

### Strong Player Answer Example

`지금은 원인 분석을 더 깊게 하기보다 lock을 유발하는 신규 write 경로를 먼저 끄거나 feature flag를 내려서 부하를 줄이겠습니다. migration이 직접 경합을 키우는 게 확인되면 일시 중단하고, 앱과 스키마 호환성을 확인한 뒤 선택적 롤백이나 기능 차단으로 주문 변경 경로부터 안정화하겠습니다.`

### Why This Is Strong

- 복구 우선 판단을 한다
- 앱/스키마 호환성을 고려한 선택적 완화를 말한다
- feature flag와 migration pause를 활용한다

### Common Mistakes

- 앱 전체 롤백만 말한다
- migration을 검증 없이 강제 종료한다
- 세션 kill로 해결하려 든다
- 복구 기준 없이 지켜보자고만 한다

### Follow-up Question 2

- `면접관의 되물림!`
- `"만약 앱 롤백은 가능하지만 migration은 이미 절반 진행된 상태라면, 어떤 기준으로 롤백 여부를 결정하시겠습니까?"`

## Turn 3

### New Reveal

- `복구 창이 더 넓어진다!`
- `주문 메모 기능을 끄자 lock wait time은 빠르게 줄고, 쓰기 API p95도 420ms 수준까지 회복됐다.`
- `가설이 정리된다!`
- `핵심 문제는 신구 쿼리 경로와 migration이 겹치며 특정 row update contention을 키운 것이었다.`
- `남은 숙제가 보인다!`
- `일부 요청은 지연 중 재시도로 두 번 제출된 흔적이 있어 사후 검증이 필요하다.`

### Interviewer Attack

- `면접관의 마무리 승부수!`
- `"이제는 복구 확인과 재발 방지를 말해보세요. 다음 배포에서는 무엇을 바꾸시겠습니까?"`

### Candidate Actions

- `관측 세우기`
- `사후 정리`
- `상황 공유`
- `변경 추적`

### Strong Player Answer Example

`우선 쓰기 API p95, lock wait time, blocked session 수, 재시도 요청 수가 안정 범위로 돌아왔는지 확인하겠습니다. 그다음 이번 배포가 왜 write contention을 만들었는지 정리하고, 다음부터는 expand-contract 방식으로 스키마를 먼저 넓힌 뒤 코드 경로를 천천히 바꾸고, migration은 온라인 방식과 배치 크기 제한, rollout 전 lock wait 관측 기준을 두겠습니다. 지연 중 중복 제출된 요청도 사후 검증해서 고객 영향이 남지 않도록 하겠습니다.`

### Why This Is Strong

- 복구 확인 지표를 명확히 말한다
- 배포 원칙 개선까지 연결한다
- 중복 제출 같은 2차 리스크도 챙긴다

### Common Mistakes

- 회복 지표 확인 없이 회고부터 말한다
- `다음엔 조심하겠다` 수준으로 끝낸다
- online migration, expand-contract 같은 구조적 개선이 없다
- 지연 중 발생한 2차 피해 검증을 빼먹는다

### Follow-up Question 3

- `면접관의 마지막 되물림!`
- `"배포 속도를 유지하면서도 이런 lock issue를 줄이려면, 개발 프로세스나 배포 검증 기준 중 무엇을 가장 먼저 바꾸시겠습니까?"`

## Total Follow-up Count

- 총 `3개`
- 권장 리듬:
  - 1턴 후 1개
  - 2턴 후 1개
  - 3턴 후 1개

이 시나리오는 `복구 우선`과 `호환성 고려`를 동시에 봐야 해서 follow-up이 특히 중요하다.

## Scoring Intent

이 시나리오에서 특히 높게 보는 포인트:

- `영향 파악`: 읽기와 쓰기를 분리해서 봤는가
- `우선순위`: 근본 원인보다 복구 기준을 먼저 제시했는가
- `기술적 추론`: migration, 인덱스, query path, lock wait를 연결했는가
- `대응 적합성`: feature flag, migration pause, 선택적 rollback을 현실적으로 사용했는가
- `설명 명확성`: 호환성 리스크와 잘못된 조치의 부작용을 함께 말했는가

특히 가산점을 주는 신호:

- `조회는 정상, 쓰기만 느림`이라는 모순 단서를 적극 활용함
- `expand-contract`, `online migration`, `release verification`을 언급함
- `세션 kill`, `무작정 롤백`의 부작용을 짚음

## Final Coaching Points

- 배포 직후 DB 락 문제는 `DB가 느리다`보다 `어떤 write path가 최근 변경과 함께 잠기고 있는가`로 접근하는 답이 강하다.
- 좋은 답변은 `읽기/쓰기 분리 -> 최근 변경 대조 -> 안전한 완화 -> 호환성 검증 -> 배포 원칙 개선` 순서를 가진다.
- 면접에서는 lock issue를 두려워하기보다 `무엇을 멈추고 무엇은 살릴지`를 말하는 판단력이 점수로 이어진다.
