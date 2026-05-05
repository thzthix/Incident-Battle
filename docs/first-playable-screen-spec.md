# First Playable Screen Spec

## Goal

첫 플레이어블은 `한 번 들어와서 1판을 끝낼 수 있는 최소 전투 UX`를 만드는 것이 목표다.

이 문서는 아래 5개 화면만 다룬다.

- title screen
- company input
- scenario select
- battle screen
- result screen

MVP 기준 원칙:

- 한 판은 `3턴`
- 한 턴은 `행동 1개 선택 + 1~2문장 입력`
- 모바일 브라우저에서 무리 없이 동작
- PWA는 얇게 지원하되 설치 유도는 후순위

## Global UX Rules

- 모든 화면은 `한 번에 한 핵심 행동`만 강조한다.
- 주요 CTA는 화면당 `1개`만 크게 둔다.
- 텍스트는 배틀 문법을 따르되, 설명은 직관적으로 쓴다.
- 자동 애니메이션은 짧게 유지하고, 유저 입력을 오래 막지 않는다.
- 첫 플레이어블에서는 저장 기능, 랭크전, 다중 모드, 설정 화면을 제외한다.

## Screen 1: Title Screen

### Purpose

게임의 정체성을 즉시 전달하고, 바로 배틀로 진입시킨다.

### Content

- 게임 로고 또는 타이틀
- 한 줄 설명
  - 예: `면접관의 시나리오 공격을 3턴 안에 받아내세요.`
- 대표 배경 1종
- 상대/플레이어 도트 실루엣 또는 idle sprite
- primary CTA: `배틀 시작`
- secondary CTA: `연습 방법 보기`

### Minimum Viable Interactions

- `배틀 시작` 탭 시 company input으로 이동
- `연습 방법 보기` 탭 시 짧은 modal 또는 bottom sheet 표시
  - 내용:
    - `행동을 고른다`
    - `이유를 1~2문장으로 쓴다`
    - `꼬리질문과 결과를 본다`

### Motion

- 배경은 약한 idle parallax만 사용
- 타이틀은 fade in
- CTA는 pulse 금지, hover/focus glow 정도만 허용

## Screen 2: Battle Setup

### Purpose

사용자에게 `이번 면접의 상대`와 `플레이어 정체성`을 가볍게 지정하게 해서 몰입을 만든다.

### Content

- 상단 back button
- 헤드라인
  - 예: `어떤 면접관과 배틀할까?`
- 회사/면접관 테마 카드 3~4개
  - 예: `토스뱅크풍`, `당근풍`, `카카오풍`, `랜덤`
- 플레이어 이름 입력 필드
- quick preset chip 3개
  - 예: `나`, `지원자`, `플레이어명`
- helper text
  - 예: `선택한 회사는 면접관 스프라이트와 일부 대사 톤에 반영됩니다.`
- CTA: `전장 고르기`

### Input Rules

- 회사 선택은 필수
  - `랜덤` 허용
- 플레이어 이름은 빈값 허용
  - 비어 있으면 기본값 `지원자`
- 플레이어 이름 최대 길이 `16자`
- 특수문자 과다 입력은 trim

### Minimum Viable Interactions

- 회사 카드 1개 선택
- 플레이어 이름 입력 가능
- quick chip 탭 시 이름 필드 자동 채움
- `전장 고르기` 탭 시 scenario select로 이동

### MVP Personalization Scope

바뀌는 요소:

- 면접관 회사 테마
- 면접관 스프라이트 색감/실루엣
- 인트로 대사
- 플레이어 표시 이름
- 결과 화면의 한두 줄 카피

바뀌지 않는 요소:

- 시나리오 구조
- 상태/기술 시스템
- 점수 규칙

### Why Not Full Interviewer Selection Yet

first playable에서는 `회사 테마 선택`까지만 두는 것이 좋다.

이유:

- 선택 피로가 적다
- 시각 자산 부담이 작다
- 회사별 대표 면접관 1명만으로도 몰입이 충분하다

Later expansion:

- 같은 회사 안에서 `압박형`, `차분형`, `꼬리질문형` 면접관 persona 선택

## Screen 3: Scenario Select

### Purpose

사용자가 이번 판의 `전장 주제`를 고르게 한다.

중요:

- 여기서는 `구체 incident`를 다 보여주지 않는다.
- 사용자는 `무엇을 연습할지`만 고른다.
- 실제 사건의 수치, 제약, 상충 단서는 배틀 인트로에서 순차 reveal한다.

### Content

- 상단: 선택된 회사 이름 표시
  - 예: `상대: 토스뱅크풍 면접관`
  - 예: `플레이어: 지원자`
- 주제 카드 3~4개
  - `배포와 변경`
  - `트래픽과 병목`
  - `결제와 의존성`
  - optional: `랜덤 승부`
- 카드마다 아래 정보만 노출
  - 주제명
  - 한 줄 설명
  - 예상 압박도 또는 난이도
  - 핵심 상태 2개 미리보기
- CTA: `이 전장으로 시작`

카드 설명 예:

- `배포와 변경`
  - `최근 변경 이후 벌어지는 장애 대응을 연습합니다.`
- `트래픽과 병목`
  - `급격한 부하와 느려진 저장소 속에서 우선순위를 세웁니다.`
- `결제와 의존성`
  - `외부 제약 속에서 복구와 정합성을 함께 판단합니다.`
- `랜덤 승부`
  - `어떤 사건이 나올지 모르는 실전형 배틀입니다.`

### Minimum Viable Interactions

- 카드 탭 시 선택 상태로 변경
- 한 번에 하나만 선택
- CTA 탭 시 battle screen으로 이동

주제 선택 후 내부 매핑 예:

- `배포와 변경`
  - `배포 직후 로그인 실패`
  - `배포 직후 DB 락 대기`
- `트래픽과 병목`
  - `트래픽 급증으로 DB 과부하`
- `결제와 의존성`
  - `결제 또는 외부 API 장애`
  - `결제 후처리 큐 적체와 중복 리스크`
- `랜덤 승부`
  - 위 전체 풀에서 1개 선택

MVP에서는 주제당 대표 incident 1개만 먼저 연결해도 된다.

### Optional But Low-Cost

- `추천` 배지 1개
  - 첫 플레이어블 기본값은 `배포와 변경`

### Why This Is Better Than Full Incident Select

- 신규 유저 부담이 적다
- 너무 문제집처럼 보이지 않는다
- 배틀 시작의 서프라이즈가 살아 있다
- 같은 주제 안에서 later variation을 넣기 쉽다

## Screen 4: Battle Screen

### Purpose

제품의 핵심 화면이다. 전장 상태를 읽고, 행동을 고르고, 면접답변처럼 짧게 설명하고, 판정을 받는다.

### Layout

데스크톱:

- top: opponent HUD
- center: stage, sprites, state chips
- bottom: textbox
- lower panel: action grid or answer input or turn result

모바일:

- top compact HUD
- center smaller stage
- state chips 2~3개만 1차 노출
- textbox와 interaction panel을 하단에 고정

### Fixed Elements

- turn indicator
- opponent name
- opponent pressure/clarity style stat은 MVP에서 시각 장식 정도로만 사용
- player label
- active state chips
- textbox

### Turn Phase Breakdown

#### 1. Turn Start

보여줄 것:

- `1턴`, `2턴`, `3턴`
- 이번 턴 목표 한 줄
  - 예: `먼저 무엇을 확인할지 정하자`
- 활성 상태 2~4개

유저 인터랙션:

- `다음` 또는 화면 탭으로 텍스트 진행

전투 문법 규칙:

- 상태 설명을 처음부터 긴 문단으로 띄우지 않는다
- 먼저 전장 이펙트가 잠깐 나온다
- 그다음 하단 텍스트박스 위에 짧은 상태명이나 기술명이 나타난다
- 마지막으로 하단 텍스트박스가 그 의미를 설명한다

예:

1. 전장 번쩍임
2. 텍스트박스 위 임시 라벨: `묶인 회선`
3. 텍스트박스: `전장에 묶인 회선이 감돈다!`
4. 텍스트박스 다음 줄: `외부 의존성 때문에 대응 선택지가 제한된다.`

#### 2. Question Phase

보여줄 것:

- 면접관 대사 1~2문장
- 핵심 질문 1개

유저 인터랙션:

- 텍스트 스킵 가능
- 질문 표시 후 action panel 자동 오픈

전투 문법 규칙:

- 면접관 기술이 있다면 질문 전에 먼저 선언한다
- 기술명은 텍스트박스 위에 잠깐 보이고, 실제 질문은 텍스트박스에서 읽는다

예:

1. 임시 라벨: `프레셔`
2. 텍스트박스: `면접관의 프레셔!`
3. 텍스트박스: `지금은 빠른 우선순위 판단이 중요합니다.`
4. 텍스트박스: `이 상황에서 가장 먼저 무엇을 확인하시겠습니까?`

#### 3. Action Select

보여줄 것:

- 행동 4개
- 현재 선택 행동 설명 패널

행동 예시:

- `범위 파악`
- `변경 추적`
- `관측 세우기`
- `즉시 우회`

유저 인터랙션:

- 행동 1개 선택
- 선택 즉시 설명 패널 갱신
- `다음` 탭 시 answer input phase

#### 4. Answer Input

보여줄 것:

- 선택한 행동명
- 입력 프롬프트
  - 예: `왜 이 행동을 먼저 쓰는지 1~2문장으로 설명하세요.`
- 글자 수 안내

입력 규칙:

- 최소 `20자`
- 권장 `30~140자`
- 최대 `220자`

유저 인터랙션:

- 텍스트 입력
- `제출` 탭

#### 5. Turn Resolution

보여줄 것:

- `너는 범위 파악을 사용했다!`
- 결과 라인
  - `효과는 굉장했다!`
  - `나쁘지 않은 판단이다.`
  - `효과가 별로인 것 같다...`
- 짧은 코치 문장 1개
- 놓친 점 1개

유저 인터랙션:

- `다음` 탭

전투 문법 규칙:

- 플레이어 행동도 상태와 마찬가지로 `행동명 -> 선언 -> 판정` 순서를 지킨다
- 행동명은 텍스트박스 위에 짧게, 설명과 판정은 텍스트박스 안에서 처리한다

#### 6. Follow-up + State Update

보여줄 것:

- 꼬리질문 1개 또는 없음
- 새 상태 공개 0~1개
- 완화된 상태는 dim 처리

유저 인터랙션:

전투 문법 규칙:

- 꼬리질문도 새 공격처럼 보여야 한다
- 질문 자체를 바로 던지지 말고, 먼저 면접관 기술 선언을 넣는다

예:

1. 임시 라벨: `되물림`
2. 텍스트박스: `면접관의 되물림!`
3. 텍스트박스: `좋습니다. 그런데 왜 그 판단을 먼저 하셨나요?`

- MVP에서는 꼬리질문에 추가 입력 받지 않음
- `다음 턴` 탭 시 다음 턴으로 이동

### Follow-up Rule

- 대표 시나리오: 총 `3개`, 턴당 최대 `1개`
- 일반 시나리오: 총 `2개`
- 꼬리질문은 추가 미니턴을 만들지 않고 다음 턴 문맥 강화에 사용

### Minimum Viable Battle Logic

- 각 턴에 행동은 `4개`만 노출
- 각 턴 결과는 `좋음 / 보통 / 아쉬움` 3단 판정으로 축약 가능
- 결과 카피는 가볍고 배틀스럽게 통일
  - `좋음`: `효과는 굉장했다!`
  - `보통`: `나쁘지 않은 판단이다.`
  - `아쉬움`: `효과가 별로인 것 같다...`
- 상태는 최대 `4개`만 동시에 강조
- 전투 중 설정 변경, 사운드 상세 설정, 난이도 변경은 제외

## Screen 5: Result Screen

### Purpose

유저가 `왜 이 점수가 나왔는지` 이해하고, 다시 한 판 할 이유를 느끼게 한다.

### Content

- 총점
- 항목별 점수 5개
  - 영향 파악
  - 우선순위
  - 기술적 추론
  - 대응 적합성
  - 설명 명확성
- 잘한 점 2개
- 놓친 점 2개
- 더 면접답변답게 다듬은 예시 1개
- CTA 1: `다시 도전`
- CTA 2: `다른 시나리오`

### Minimum Viable Interactions

- `다시 도전` 탭 시 같은 시나리오 재시작
- `다른 시나리오` 탭 시 scenario select로 복귀

### Optional But Useful

- 회사 이름 반영 카피
  - 예: `토스뱅크 면접관은 더 분명한 우선순위를 원했습니다.`

## Mobile Considerations

### Layout Rules

- 기준 폭: `360px`부터 usable 해야 함
- 상태칩은 최대 `3개`까지만 1차 노출
- 4번째부터는 `+1` 요약
- 텍스트박스는 항상 하단 고정
- 입력창이 열리면 stage 높이를 줄이고 HUD를 compact mode로 축소

### Interaction Rules

- 주요 버튼 높이 최소 `48px`
- 행동 카드 간격 충분히 확보
- 스크롤은 screen 전체가 아니라 `result content area` 정도만 허용
- battle screen에서 세로 스크롤은 가능한 한 피함

### Performance Rules

- 애니메이션은 `transform`과 `opacity` 중심
- 동시 애니메이션은 2레이어 이내
- stage 배경은 정적 이미지 1장 + 약한 오버레이 효과만 허용

## MVP Navigation Map

1. title screen
2. company input
3. scenario select
4. battle screen
5. result screen
6. scenario select or rematch

## Minimum Viable Components

- `TitleScreen`
- `CompanyInputScreen`
- `ScenarioSelectScreen`
- `BattleScreen`
- `Textbox`
- `StateChipList`
- `ActionGrid`
- `AnswerInputPanel`
- `TurnResolutionPanel`
- `ResultScreen`

## Out of Scope For MVP

- 로그인
- 사용자 기록 저장
- 다중 회사별 전용 시나리오 분기
- 설치 유도 온보딩
- 푸시 알림
- 배경음 상세 설정
- 꼬리질문 추가 자유서술 입력
- 랭크전

## Implementation Notes

- 라우팅은 screen 단위로 단순하게 가져간다.
- battle screen 내부는 `phase state machine`으로 관리한다.
- 시나리오, 상태, 행동 데이터는 JSON으로 주입한다.
- 첫 플레이어블은 `튜토리얼 1개 + 대표 시나리오 3개`만 연결하면 충분하다.

## MVP Acceptance Check

- 유저가 30초 안에 첫 시나리오를 시작할 수 있다.
- 한 턴에서 해야 할 일이 명확하다.
- 모바일에서 행동 4개와 입력창을 무리 없이 사용할 수 있다.
- 한 판이 4~6분 안에 끝난다.
- 결과 화면이 `재도전`을 유도한다.
