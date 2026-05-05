# Realism Upgrade PM Plan

## Goal

대표 시나리오와 이후 시나리오가 `교과서형 장애 질문`이 아니라 `실제 운영 면접 프롬프트`처럼 읽히도록 콘텐츠 품질 기준을 올린다.

## New Quality Bar

모든 대표 시나리오는 아래 8가지를 반드시 포함한다.

- 구체적인 시각과 이벤트 맥락
- 영향을 받는 정확한 사용자 흐름
- 숫자로 보이는 관측 신호 2개 이상
- 단순 정답을 막는 모순 단서 1개 이상
- 의사결정을 어렵게 만드는 제약 조건
- 잘못된 대응의 리스크
- 2턴에서 새롭게 드러나는 사실
- 3턴에서 원인 또는 예방으로 이어지는 사실

## Immediate Rewrites

### 1. `트래픽 급증으로 DB 과부하`

상태:

- 완료

적용 내용:

- 점심 피크 시간대
- 푸시 발송 직후 8배 유입
- 홈 피드/상품 상세 영향
- DB read latency, replica connection, cache hit rate 수치 추가
- 앱 서버 CPU가 높지 않다는 모순 단서 추가
- 잘못된 scale-out / cache flush 리스크 추가

### 2. `배포 직후 로그인 실패`

해야 할 보강:

- 모바일 앱 특정 버전 영향 여부
- 웹 로그인 정상 여부
- 배포된 설정 변경과 롤백 제약
- 인증/세션/설정 중 어떤 축이 의심되는지 모순 단서 추가

### 3. `결제 또는 외부 API 장애`

해야 할 보강:

- 결제 승인/주문 생성/재시도 중 어느 단계가 느린지 분리
- 중복 결제 위험 또는 고객 신뢰 리스크 추가
- 외부 PG/인증사와 내부 저장 흐름의 모순 단서 추가
- 우회 경로의 한계와 공지 기준 보강

## Next Content Tasks

### Task 1. Rewrite Remaining Flagship Scenarios

우선순위:

1. `배포 직후 로그인 실패`
2. `결제 또는 외부 API 장애`

Definition of done:

- realism rules 8개 충족
- 턴 2와 턴 3 reveal이 더 구체적임
- 꼬리질문이 답변 구조를 실제로 흔듦

### Task 2. Add `signal pack` to each scenario

각 시나리오에 별도 블록으로 정리:

- 주요 지표
- 반대 단서
- 제약
- 위험한 조치

이 블록은 나중에:

- `상황 다시 보기` 패널
- LLM 채점 컨텍스트
- 디버그용 개발 데이터

에 모두 재사용할 수 있다.

### Task 3. Create a `scenario writing template v2`

필수 필드:

- incident_brief
- time_context
- user_impact
- measurable_symptoms
- conflicting_clues
- constraints
- wrong_move_risks
- turn_1_goal
- turn_2_reveal
- turn_3_reveal
- follow_up_intent

### Task 4. Upgrade battle copy rules

해야 할 일:

- 긴 사건 브리프를 전투 텍스트 4~6줄로 쪼개는 규칙 문서화
- 상태 reveal line과 관측 line을 분리
- `상황 다시 보기` 패널의 정보 계층 정의

### Task 5. Sync realism with scoring

채점에서 더 강하게 봐야 하는 항목:

- 모순 단서를 활용했는가
- 위험한 대응의 부작용을 짚었는가
- 사용자 흐름을 분리해서 봤는가

## PM Recommendation

이제 구현 전에 가장 가치가 큰 일은 `남은 대표 시나리오 2개도 같은 수준으로 리라이트`하는 것이다.

그 다음 순서는:

1. 대표 시나리오 3개 현실감 기준 통일
2. 긴 사건 브리프를 전투 텍스트로 쪼개는 규칙 정리
3. `상황 다시 보기` 패널 spec 추가
4. 첫 플레이어블 mock 데이터 반영
