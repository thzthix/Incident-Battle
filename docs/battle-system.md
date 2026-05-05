# Battle System

## Design Rule

Do not show raw interview metadata first.
Translate real situations into battle language, then explain them clearly.

Every battle state should have:

- battle name
- short description
- interview meaning
- strong actions

## State Categories

### Pressure States

Used for time pressure, follow-up pressure, and ambiguity.

### System States

Used for deploys, traffic, observability, and database issues.

### Dependency States

Used for third-party or organizational constraints.

### Impact States

Used for business-critical pressure and user harm.

### Defense States

Used for rollback windows, feature flags, caches, and fallback paths.

## Presentation Rules

Every state is shown in three layers:

1. chip name
2. one-line explanation
3. interview meaning and strong actions

Example:

- `변경 흔적`
- `최근 시스템 변경의 여파가 남아 있다.`
- `배포와 설정 변경을 원인 후보로 우선 확인해야 한다.`

## Textbox Rules

- one thought at a time
- short sentences
- action-first language
- battle line first, explanation second, coaching third

Good examples:

- `면접관이 승부를 걸어왔다!`
- `전장에 과부하가 몰아친다!`
- `지금은 빠른 판단이 중요해 보인다.`
- `어떤 대응을 먼저 꺼낼까?`

## Battle-State Catalog

### `압박감`

- short description: 빠른 결론과 우선순위 판단이 요구된다.
- interview meaning: 길게 설명하기보다 무엇부터 할지 먼저 말해야 한다.
- strong actions: `우선순위 선언`, `범위 파악`, `상황 공유`

### `되물림`

- short description: 방금 선택의 근거를 다시 설명해야 한다.
- interview meaning: 선택 자체보다 이유를 분명히 말해야 점수가 오른다.
- strong actions: `가정 명시`, `우선순위 선언`, `원인 분리`

### `흔들기`

- short description: 조건이 모호해 가정을 분명히 해야 한다.
- interview meaning: 확정적으로 말하기보다 확인할 정보와 분기를 함께 제시해야 한다.
- strong actions: `가정 명시`, `관측 세우기`, `범위 파악`

### `촉박한 창`

- short description: 시간이 부족해 복구 우선 판단이 중요하다.
- interview meaning: 완벽한 원인 분석보다 안전한 첫 대응이 더 점수를 받는다.
- strong actions: `우선순위 선언`, `임시 완화`, `상황 공유`

### `과부하`

- short description: 요청 폭증이나 자원 포화가 진행 중이다.
- interview meaning: 병목과 영향 범위를 빠르게 분리해 봐야 한다.
- strong actions: `범위 파악`, `부하 분산`, `원인 분리`

### `변경 흔적`

- short description: 최근 배포나 설정 변경의 영향이 의심된다.
- interview meaning: 최근 변경과 장애 시작 시점을 먼저 대조해야 한다.
- strong actions: `변경 추적`, `되돌리기`, `원인 분리`

### `흐린 로그`

- short description: 관측 정보가 부족해 판단이 늦어진다.
- interview meaning: 추측만 하지 말고 로그, 메트릭, 알람을 먼저 정리해야 한다.
- strong actions: `관측 세우기`, `범위 파악`, `가정 명시`

### `느린 저장소`

- short description: DB 또는 저장 계층 반응이 둔해졌다.
- interview meaning: 느려진 계층과 영향을 받는 기능을 분리해서 판단해야 한다.
- strong actions: `의존성 점검`, `원인 분리`, `즉시 우회`

### `가설 붕괴`

- short description: 처음 세운 가설이 더 이상 맞지 않는다.
- interview meaning: 새로운 정보에 맞춰 판단을 갱신해야 한다.
- strong actions: `원인 분리`, `관측 세우기`, `가정 명시`

### `묶인 회선`

- short description: 외부 의존성 때문에 움직임이 제한된다.
- interview meaning: 우리 시스템만 보지 말고 fallback과 격리를 같이 봐야 한다.
- strong actions: `의존성 점검`, `즉시 우회`, `협업 호출`

### `대기열 정체`

- short description: 큐 적체나 승인 대기로 대응 속도가 떨어진다.
- interview meaning: 임계 업무와 비임계 업무를 분리해서 먼저 흘려야 한다.
- strong actions: `우선순위 선언`, `부하 분산`, `협업 호출`

### `레거시 잔상`

- short description: 구조상 빠른 수정이 어렵다.
- interview meaning: 위험한 직접 수정 대신 안전한 우회나 차단이 필요하다.
- strong actions: `임시 완화`, `즉시 우회`, `상황 공유`

### `급한 불`

- short description: 핵심 사용자 흐름 장애로 피해가 크다.
- interview meaning: 기술적 호기심보다 복구와 영향 최소화가 먼저다.
- strong actions: `범위 파악`, `임시 완화`, `상황 공유`

### `불만 누적`

- short description: 재시도 실패와 CS 유입이 쌓이고 있다.
- interview meaning: 사용자 체감과 커뮤니케이션을 함께 고려해야 한다.
- strong actions: `상황 공유`, `임시 완화`, `즉시 우회`

### `핵심 시간대`

- short description: 평소보다 장애 허용도가 낮다.
- interview meaning: 지금은 기술적 완벽함보다 짧은 복구 시간이 더 중요하다.
- strong actions: `우선순위 선언`, `임시 완화`, `되돌리기`

### `확산 조짐`

- short description: 문제가 더 넓은 영역으로 번질 수 있다.
- interview meaning: blast radius를 줄이는 격리 판단이 중요하다.
- strong actions: `우선 차단`, `범위 파악`, `상황 공유`

### `복구 창`

- short description: 롤백이나 기능 플래그 같은 빠른 완화 수단이 있다.
- interview meaning: 안전한 복구 수단이 보이면 과감히 활용할 수 있어야 한다.
- strong actions: `되돌리기`, `임시 완화`, `즉시 우회`

### `완충층`

- short description: 캐시, 큐, 레플리카 같은 완충 자원이 존재한다.
- interview meaning: 시스템 보호막을 적극 활용하는 판단이 좋다.
- strong actions: `부하 분산`, `즉시 우회`, `의존성 점검`

### `우회로`

- short description: 대체 경로가 아직 살아 있다.
- interview meaning: 완전 복구 전이라도 사용자 피해를 줄일 수 있다.
- strong actions: `즉시 우회`, `상황 공유`, `협업 호출`

## Action Categories

### Recon

- `범위 파악`: 사용자 영향과 실패 범위를 먼저 확인한다.
- `변경 추적`: 최근 배포, 설정 변경, feature flag를 대조한다.
- `관측 세우기`: 로그, 메트릭, 알람을 정리한다.
- `의존성 점검`: 외부 API, DB, 캐시, 네트워크를 분리해 본다.

### Mitigation

- `우선 차단`: 문제 기능을 제한하거나 확산을 막는다.
- `즉시 우회`: fallback, degraded mode, alternate path를 쓴다.
- `되돌리기`: 롤백 또는 설정 복원을 검토한다.
- `부하 분산`: rate limit, queue, cache, scaling을 활용한다.

### Judgment

- `우선순위 선언`: 무엇부터 할지 명확히 말한다.
- `가정 명시`: 정보 부족 시 분기와 가정을 설명한다.
- `원인 분리`: 앱, 인프라, 외부 의존성을 구분해 본다.

### Communication

- `상황 공유`: 현재 영향, 조치, 다음 단계를 전달한다.
- `협업 호출`: 관련 팀이나 외부 파트너를 병렬 호출한다.
- `사후 정리`: 회고, 재발 방지, 모니터링 보강을 말한다.

## Sample Flavor Lines

- `면접관이 승부를 걸어왔다!`
- `전장에 압박감이 감돈다!`
- `변경 흔적이 진하게 남아 있다!`
- `급한 불이 번지고 있다!`
- `묶인 회선 때문에 움직임이 제한된다!`
- `기존 가설이 무너졌다! 새 판단이 필요하다.`
- `지금은 빠른 복구가 중요해 보인다.`
- `당신은 첫 대응으로 무엇을 선택하겠는가?`
