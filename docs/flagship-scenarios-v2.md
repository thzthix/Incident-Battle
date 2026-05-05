# Flagship Scenarios V2

## Purpose

This document upgrades the flagship scenarios from `broad incident patterns` into `realistic interview incidents`.

Each scenario now includes:

- full incident brief
- realism anchors
- battle-beat reveal lines
- turn 2 and turn 3 reveals
- follow-up pressure points

## Scenario 1

### Title

`배포 직후 모바일 로그인 실패`

### Full Brief

`점심 직전 배포 10분 후 모바일 앱 로그인 실패율이 2%에서 18%로 상승했습니다. 웹 로그인은 정상이고, 실패는 앱 최신 버전에 집중됩니다. 인증 관련 설정 변경이 이번 배포에 포함됐지만, 앱 서버 CPU와 DB 지표는 안정적입니다. 롤백은 가능하지만 일부 인스턴스에는 새 설정이 이미 반영돼 있어 성급한 되돌리기는 설정 불일치를 키울 수 있습니다. 지금 무엇을 먼저 확인하시겠습니까?`

### Realism Anchors

- time context: `점심 직전`, `배포 10분 후`
- impact surface: `모바일 앱 로그인`, `웹은 정상`
- measurable signal: `실패율 2% -> 18%`
- contradictory clue: `CPU와 DB는 안정적`
- constraint: `핵심 진입 흐름`, `점심 직전`
- wrong-move risk: `성급한 롤백 시 설정 불일치`

### Starting States

- `변경 흔적`
- `압박감`
- `급한 불`

### Battle Beats Before Turn 1 Question

- `변경 흔적이 진하게 남아 있다!`
- `배포 10분 뒤 모바일 로그인 실패율이 2%에서 18%로 뛰었다.`

- `급한 불이 번지고 있다!`
- `실패는 웹이 아니라 모바일 앱 최신 버전에 집중되고 있다.`

- `관측된 수치가 드러났다!`
- `앱 서버 CPU와 DB 지표는 아직 안정적이다.`

- `복구 창은 열려 있지만 조심해야 한다!`
- `성급한 롤백은 설정 불일치를 키울 수 있다.`

- `면접관의 추궁!`
- `\"이 상황에서 가장 먼저 무엇을 확인하시겠습니까?\"`

### Turn 2 Reveal

- `추가 정보가 드러났다!`
- `인증 설정 값이 새 버전 인스턴스에만 다르게 반영된 흔적이 보인다.`
- `일부 사용자는 재시도로 로그인에 성공하지만 실패율은 계속 높다.`

### Turn 3 Reveal

- `가설이 더 넓어진다!`
- `외부 인증 응답 지연도 일부 구간에서 함께 관측된다.`
- `CS 문의와 재시도 요청이 빠르게 늘고 있다.`

### Follow-up Pressure Points

- why impact check before rollback
- how to confirm deploy correlation
- what to do if rollback does not fully recover

## Scenario 2

### Title

`캠페인 직후 조회 트래픽 급증과 DB 읽기 지연`

### Full Brief

`점심 캠페인 시작 5분 후 트래픽이 평소의 8배로 뛰었습니다. 메인 조회 API의 p95는 120ms에서 1.8초로 상승했고, 상품 상세와 리스트 조회에서 사용자 체감이 커지고 있습니다. 앱 서버 CPU는 높지 않지만 DB read latency와 read replica lag가 동시에 치솟고 있습니다. 결제와 쓰기 기능은 아직 정상이라 전체 차단은 피하고 싶고, 지금은 점심 피크 시간대라 핵심 조회 흐름을 오래 느리게 둘 수 없습니다. 무엇을 먼저 확인하시겠습니까?`

### Realism Anchors

- time context: `점심 캠페인 시작 5분 후`
- impact surface: `상품 상세`, `리스트 조회`
- measurable signal: `p95 120ms -> 1.8s`, `replica lag 증가`
- contradictory clue: `앱 서버 CPU는 높지 않음`
- constraint: `결제/쓰기 정상`, `전체 차단은 피해야 함`
- wrong-move risk: `무작정 차단 시 정상 구매 흐름까지 손상`

### Starting States

- `과부하`
- `핵심 시간대`
- `급한 불`

### Battle Beats Before Turn 1 Question

- `전장에 과부하가 몰아친다!`
- `점심 캠페인 시작 5분 만에 트래픽이 평소의 8배로 뛰었다.`

- `급한 불이 번지고 있다!`
- `상품 상세와 리스트 조회 체감 지연이 빠르게 커지고 있다.`

- `관측된 수치가 드러났다!`
- `메인 조회 API의 p95가 120ms에서 1.8초로 상승했다.`

- `느린 저장소가 모습을 드러낸다!`
- `앱 서버 CPU는 높지 않지만 DB read latency와 replica lag가 급격히 치솟고 있다.`

- `핵심 시간대다!`
- `결제는 아직 정상이라 전체 차단 없이 핵심 조회만 지켜야 한다.`

- `면접관의 추궁!`
- `\"이 상황에서 가장 먼저 무엇을 확인하시겠습니까?\"`

### Turn 2 Reveal

- `핫 경로가 드러났다!`
- `메인 리스트 조회가 같은 인기 상품군을 반복 조회하며 캐시 미스가 집중되고 있다.`
- `백필성 집계 쿼리도 같은 읽기 자원을 함께 잡아먹고 있다.`

### Turn 3 Reveal

- `복구 창이 열렸다!`
- `일부 조회 기능을 제한하자 p95가 안정되기 시작했다.`
- `하지만 사용자 문의와 새로고침 재시도는 여전히 많다.`

### Follow-up Pressure Points

- why DB is suspected without over-anchoring
- what to sacrifice first without hurting checkout
- what structural fix prevents the next campaign failure

## Scenario 3

### Title

`핵심 시간대 결제 타임아웃과 외부 PG 지연`

### Full Brief

`저녁 피크 시간대에 결제 요청 timeout 비율이 1% 미만에서 14%까지 상승했습니다. 특정 카드사와 간편결제 수단에서 실패가 더 많고, 외부 PG 응답 지연이 확인되지만 우리 내부 저장소 쓰기 latency도 함께 늘고 있습니다. 주문 생성은 되지만 승인 결과가 늦어 일부 요청의 최종 상태가 불분명해지고 있습니다. 전체 결제를 막고 싶지는 않지만, 성급한 재시도는 중복 결제나 누락 처리 리스크를 키울 수 있습니다. 지금 무엇을 먼저 확인하시겠습니까?`

### Realism Anchors

- time context: `저녁 피크 시간대`
- impact surface: `결제 승인`, `특정 카드사/간편결제`
- measurable signal: `timeout <1% -> 14%`
- contradictory clue: `외부 PG도 느리지만 내부 쓰기도 느림`
- constraint: `전체 결제 차단은 피하고 싶음`
- wrong-move risk: `성급한 재시도 시 중복 결제/누락`

### Starting States

- `묶인 회선`
- `급한 불`
- `불만 누적`

### Battle Beats Before Turn 1 Question

- `묶인 회선 때문에 움직임이 제한된다!`
- `저녁 피크 시간대에 외부 PG 응답 지연이 커지고 있다.`

- `급한 불이 번지고 있다!`
- `결제 timeout 비율이 1% 미만에서 14%까지 상승했다.`

- `관측된 수치가 드러났다!`
- `특정 카드사와 간편결제 수단에서 실패가 더 많다.`

- `가설을 흔드는 단서가 있다!`
- `외부 PG만이 아니라 내부 저장소 쓰기 latency도 함께 늘고 있다.`

- `정합성 리스크가 커진다!`
- `성급한 재시도는 중복 결제나 누락 처리 문제를 만들 수 있다.`

- `면접관의 추궁!`
- `\"이 상황에서 가장 먼저 무엇을 확인하시겠습니까?\"`

### Turn 2 Reveal

- `상태가 더 분명해진다!`
- `승인 요청은 외부 PG에서 지연되고, 우리 쪽 재시도 큐도 쌓이기 시작했다.`
- `일부 결제 수단은 임시 비활성화와 우회가 가능하다.`

### Turn 3 Reveal

- `복구 창이 열렸다!`
- `일부 결제 수단을 제한하자 승인 성공률은 회복되기 시작했다.`
- `하지만 실패 요청 중 일부는 최종 상태가 불분명해 사후 정합성 검증이 필요하다.`

### Follow-up Pressure Points

- how to split external delay from internal bottleneck
- how to reduce damage without creating duplicate charges
- how to verify correctness and communicate after recovery

## PM Rule

If a scenario still reads like a category name instead of an incident report, rewrite it again.
