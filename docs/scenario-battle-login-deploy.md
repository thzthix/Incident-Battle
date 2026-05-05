# Scenario Battle Script

## Scenario

`배포 직후 로그인 실패`

## Purpose

- tutorial-friendly first battle
- teaches impact-first thinking
- teaches deploy correlation and rollback judgment
- creates strong battle flavor with minimal system complexity

## Incident Brief

`평일 오전 8시 50분, 출근 피크 10분 전 배포가 끝난 뒤 모바일 앱 로그인 실패율이 1.8%에서 17.6%로 급증했습니다. 웹 로그인은 거의 정상이고, 앱 서버 CPU는 높지 않지만 인증 API timeout과 일부 신규 설정 반영 인스턴스에서 오류가 집중됩니다.`

## Realism Anchors

### Time Context

- `오전 8시 50분`
- `출근 피크 10분 전`
- `배포 완료 12분 후`

### User Impact Surface

- 모바일 앱 로그인 사용자 중심
- 웹 로그인은 대부분 정상
- 로그인 실패 후 재시도와 CS 문의가 빠르게 증가

### Measurable Signals

- 전체 로그인 실패율 `1.8% -> 17.6%`
- iOS 최신 앱 버전 실패율 `24%`
- 인증 API timeout 비율 `0.7% -> 11%`
- 앱 서버 CPU는 `40% 이하`로 안정적

### Contradictory Clues

- 웹은 거의 정상이라 전체 인증 시스템 다운으로 단정하기 어렵다
- 앱 서버 CPU는 높지 않아 단순 서버 과부하처럼 보이지 않는다
- 일부 pod만 신규 설정을 반영한 흔적이 있다

### Constraint

- `출근 피크 직전`이라 로그인 지연 허용도가 낮다
- 즉시 롤백은 가능하지만 일부 인스턴스에는 새 설정이 이미 반영되었다
- 성급한 전체 재배포는 장애 범위를 더 넓힐 수 있다

### Risk Of Wrong Moves

- 근거 없는 전체 롤백은 설정 불일치와 세션 재로그인을 키울 수 있다
- 무분별한 재시도 유도는 인증 의존성 부하를 더 키울 수 있다
- 원인 분리 없이 앱 서버만 증설하면 복구가 늦어진다

## Starting States

### `변경 흔적`

- short description: 최근 시스템 변경의 여파가 남아 있다.
- interview meaning: 배포와 장애 시작 시점을 먼저 대조해야 한다.

### `압박감`

- short description: 빠른 결론과 우선순위 판단이 요구된다.
- interview meaning: 장황한 분석보다 첫 확인 대상과 이유를 먼저 말해야 한다.

### `급한 불`

- short description: 핵심 사용자 흐름 장애로 피해가 크다.
- interview meaning: 로그인은 핵심 진입 흐름이므로 사용자 영향 최소화가 우선이다.

## Battle Goal

The player should show:

- impact-first triage
- deploy-aware reasoning
- safe mitigation judgment
- clear communication and recovery checks

## Follow-Up Budget

- total follow-up questions: `3`
- turn 1: `1`
- turn 2: `1`
- turn 3: `1`

This is the MVP default because:

- fewer than 2 feels too light for a scenario interview
- more than 3 slows the battle and makes one run feel too long

## Turn 1

### State Reveal

`토스뱅크풍 면접관이 승부를 걸어왔다!`

`전장에 변경 흔적이 남아 있다!`

`배포가 끝난 지 12분, 최근 변경의 여파를 무시할 수 없다.`

`압박감이 전장을 조인다!`

`출근 피크가 다가온다. 지금은 빠른 우선순위 판단이 중요하다.`

`급한 불이 번지고 있다!`

`모바일 로그인 실패율이 17.6%까지 치솟았다. 핵심 진입 흐름이 흔들리고 있다.`

`추가 징후가 포착됐다!`

`웹 로그인은 대부분 정상이고, 앱 서버 CPU도 높지 않다. 단순 과부하로 몰아가긴 이르다.`

### Interviewer Attack

`면접관의 추궁!`

`"이 상황에서 가장 먼저 무엇을 확인하시겠습니까? 무엇이 가장 크게 망가졌는지부터 답해보세요."`

### Recommended Candidate Actions

- `범위 파악`
- `변경 추적`
- `관측 세우기`
- `우선순위 선언`

### Best-Path Action

`범위 파악`

This is strongest because:

- the user impact is immediate
- login is a core flow
- `압박감` rewards a clear first step
- `급한 불` rewards blast radius and impact checks

### Strong Player Answer Example

`우선 모바일 로그인 실패가 전체 사용자 문제인지, 특정 앱 버전이나 특정 pod 그룹에 집중되는지 확인하겠습니다. 동시에 로그인 외 가입, 결제 진입 같은 핵심 흐름까지 번졌는지 보고 사용자 영향 범위를 먼저 정리하겠습니다.`

### Turn Result Flavor

`너는 범위 파악을 꺼냈다!`

`급한 불에 효과는 굉장했다!`

`사용자 영향부터 본 판단이 좋았습니다.`

### Follow-Up Question 1

`면접관의 되물림!`

`"좋습니다. 그런데 최근 배포와의 관련성은 어떻게 빠르게 확인하시겠습니까?"`

### Good Follow-Up Direction

The player should mention:

- deployment time correlation
- feature flag or config difference
- error rate by app version or pod group
- web vs app segmentation

## Turn 2

### New Reveal

`추가 정보가 드러났다!`

`실패는 iOS 최신 앱 버전과 신규 설정이 반영된 pod 그룹에서 특히 심하다.`

`복구 창이 열렸다!`

`로그인 설정만 선택적으로 되돌릴 수 있다. 다만 이미 발급된 일부 세션 토큰 정책과 충돌할 수 있다.`

`흐린 로그가 끼어든다!`

`에러 로그는 충분하지 않지만, 인증 API timeout과 config checksum 차이가 함께 관찰된다.`

### Interviewer Attack

`면접관의 압박!`

`"배포 연관성이 강해 보입니다. 하지만 성급한 조치도 위험합니다. 지금 어떤 대응을 하시겠습니까?"`

### Recommended Candidate Actions

- `변경 추적`
- `되돌리기`
- `관측 세우기`
- `우선 차단`

### Best-Path Action

`변경 추적` or `되돌리기`

MVP judgment note:

- `변경 추적` is the safest high-score answer when the player explains rollback criteria
- `되돌리기` can also score highly if the player explicitly ties it to core-flow impact and a reversible recovery path

### Strong Player Answer Example

`오류 증가 시점과 배포 시점을 다시 대조하고, 최신 앱 버전과 특정 pod에만 집중된다면 로그인 설정 변경부터 선택적으로 되돌리겠습니다. 로그인은 출근 시간 핵심 흐름이므로, 세션 충돌 리스크를 확인하면서도 사용자 영향이 큰 구간부터 빠르게 복구를 우선하겠습니다.`

### Turn Result Flavor

`너는 변경 추적을 사용했다!`

`변경 흔적을 정확히 읽어냈다!`

`원인 후보를 최근 변경으로 좁히면서도 성급한 전체 롤백을 피한 점이 좋았습니다.`

### Follow-Up Question 2

`면접관의 되물림!`

`"좋습니다. 그런데 선택적 롤백 뒤에도 실패율이 충분히 내려오지 않는다면, 다음 가설은 무엇입니까?"`

### Good Follow-Up Direction

The player should mention:

- external auth dependency
- config drift
- infra or cache issue
- app version segmentation
- token or session policy mismatch

## Turn 3

### New Reveal

`기존 가설이 흔들린다!`

`선택적 롤백 후 전체 실패율은 17.6%에서 6.4%로 내려갔지만, 외부 인증 응답 지연은 여전히 남아 있다.`

`불만 누적이 시작됐다!`

`CS 문의는 4배로 늘었고, 로그인 재시도로 인증 호출량도 다시 올라가고 있다.`

`묶인 회선이 드러났다!`

`외부 인증사 응답이 특정 구간에서 2초 이상 지연된다. 우리 쪽 복구만으로는 완전히 끝나지 않는다.`

### Interviewer Attack

`면접관의 압박 연계!`

`"이제 배포 이슈와 외부 의존성 이슈가 겹쳐 보입니다. 서비스를 안정화하고, 팀과 사용자에게는 어떻게 대응하시겠습니까?"`

### Recommended Candidate Actions

- `의존성 점검`
- `상황 공유`
- `즉시 우회`
- `원인 분리`

### Best-Path Action

`상황 공유`

This is strongest here because:

- turn 3 is about stabilize and communicate
- `불만 누적` rewards communication
- the player should now show recovery verification and next-step ownership

### Strong Player Answer Example

`로그인 설정 복원 이후 남은 실패를 외부 인증 지연과 분리해서 보겠습니다. 동시에 재시도 폭증을 막도록 앱 로그인 안내와 임시 우회 가능 여부를 팀과 CS에 바로 공유하고, 외부 인증사와는 timeout 구간과 영향 범위를 병렬로 맞추겠습니다. 복구 후에는 앱 버전별 검증, config checksum 확인, 인증 의존성 synthetic check를 먼저 보강하겠습니다.`

### Turn Result Flavor

`너는 상황 공유를 사용했다!`

`불만 누적을 안정적으로 받아냈다!`

`기술 대응, 재시도 억제, 외부 의존성 커뮤니케이션을 함께 묶은 점이 좋았습니다.`

### Follow-Up Question 3

`면접관의 마지막 추궁!`

`"재발 방지를 위해 한 가지만 먼저 보강한다면 무엇을 선택하시겠습니까? 가장 빨리 사고를 줄일 수 있는 것 하나만 고르세요."`

### Good Follow-Up Direction

The player should mention one of:

- deploy verification by app version
- config validation and rollback safety
- auth dependency monitoring
- login flow synthetic checks

## Common Mistakes

### Mistake 1

`처음부터 무조건 롤백만 말함`

Why it is weak:

- 영향 범위와 세그먼트가 아직 명확하지 않다
- 부분 롤백이 가능한데 전체 롤백부터 말하면 불필요한 위험이 크다
- 구조적 판단보다 반사적 대응처럼 들린다

### Mistake 2

`로그만 보겠다고 길게 설명함`

Why it is weak:

- `압박감` state punishes slow and vague priority
- 핵심 흐름과 사용자 영향을 먼저 말하지 못한다
- 피크 시간 제약이 반영되지 않는다

### Mistake 3

`배포 가설이 흔들린 뒤에도 계속 같은 가설만 고집함`

Why it is weak:

- the player ignores new evidence
- 외부 인증 지연이라는 새 단서를 받아들이지 못한다
- 압박 속 적응력이 낮아 보인다

### Mistake 4

`복구와 공지를 전혀 언급하지 않음`

Why it is weak:

- login is a core user flow
- 재시도 증가와 CS 폭증을 방치하게 된다
- 팀과 사용자 신뢰를 동시에 깎는다

## Strong Answer Spine

The ideal reasoning order is:

1. `영향 범위를 먼저 본다`
2. `앱 버전, pod 그룹, 웹/앱 차이로 증상을 세그먼트한다`
3. `최근 배포와 설정 변화의 관련성을 확인한다`
4. `복구 창이 열려 있으면 조건부 되돌리기를 검토한다`
5. `롤백 후에도 남는 증상은 외부 인증과 세션 정책으로 분리한다`
6. `팀, CS, 외부 의존성 담당자와 현재 조치와 다음 단계를 공유한다`
7. `앱 버전 검증, 설정 검증, synthetic check를 보강하는 재발 방지로 마무리한다`

## Final Coaching Points

### What Good Players Did

- 핵심 기능 장애에서 사용자 영향을 먼저 확인했다.
- 앱/웹, 버전, pod 그룹 차이로 증상을 잘 나눴다.
- 최근 배포라는 강한 단서를 빠르게 활용했다.
- 복구와 원인 분석의 순서를 구분했다.
- 새 정보가 나오자 가설을 갱신했다.
- 팀, CS, 외부 의존성 커뮤니케이션까지 포함했다.

### What To Improve

- 첫 턴에서는 사용자 영향과 세그먼트를 먼저 끊어 말한다.
- 롤백은 범위, 조건, 세션 충돌 리스크를 함께 붙여 더 명확하게 말한다.
- 마지막 턴에서는 외부 인증 지연과 내부 배포 이슈를 분리해서 정리한다.

### Final Coach Line

`좋은 답변은 모든 가능성을 한 번에 쏟아내는 것이 아니라, 사용자 영향 -> 세그먼트 분리 -> 최근 변경 확인 -> 안전한 복구 -> 남은 의존성 분리 -> 공유 순서로 전장을 읽는 것입니다.`
