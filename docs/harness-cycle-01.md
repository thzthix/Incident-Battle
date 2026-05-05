# Harness Cycle 01

## 목표
첫 하네스 사이클에서는 전체 앱이 아니라 `턴 인터랙션 패널`만 경쟁 단위로 잡는다.

## 이유
- 플레이 핵심이다.
- 기능 완결성이 뚜렷하다.
- 입력 UX와 면접 훈련 적합성을 비교하기 쉽다.
- reducer나 schema를 건드리지 않고도 개선 여지가 크다.

## 범위
수정 가능:
- `src/components/TurnPanel.tsx`
- `styles.css`

수정 금지:
- `src/battleReducer.ts`
- `src/evaluateBattle.ts`
- `data/*.json`
- `src/types.ts`

## 하드 게이트
- `npm run build` 통과
- 3턴 플로우 유지
- 답변 입력과 제출이 깨지지 않음

## judge 포인트
- 행동 선택과 답변 입력 맥락이 자연스러운가
- 버튼 상태와 정보 배치가 분명한가
- 텍스트박스 중심 흐름을 해치지 않는가
- 모바일에서도 버티는가

## 채택 규칙
- hard gate 통과 + 92점 이상: 채택
- hard gate 통과 + 88~91점: 조건부 채택
- hard gate 미통과: 탈락
