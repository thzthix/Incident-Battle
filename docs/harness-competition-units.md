# Harness Competition Units

## 원칙
계약(schema/phase/props)은 얼리고, 로직과 UI와 카피를 따로 경쟁시킨다.
한 후보안이 바꾸는 판단 축이 1개를 넘으면 범위가 커진다.

## 절대 같이 경쟁시키지 말 것
- `data schema` + `reducer`
- `reducer` + `result scoring/copy`
- `component contract` + `CSS layout`
- `scenario content` + `evaluator rules`
- `battle phase model` + `animation timing`

## 같은 단위로 묶어도 되는 것
- `CSS + 미세한 연출`
- `result copy + feedback tone`
- `presentational component split`
- `theme skin + visual polish`
- `loader 내부 정리 + 순수 함수 추출`

## 권장 경쟁 단위
1. `턴 인터랙션 패널`
파일 범위:
- `src/components/TurnPanel.tsx`
- 관련 CSS
제외:
- scoring 규칙 변경 금지
- reducer 변경 금지

2. `결과 피드백 패널`
파일 범위:
- `src/components/ResultPanel.tsx`
- 결과 문구
- 관련 CSS
제외:
- reducer/state 변경 금지

3. `인트로 케이던스`
파일 범위:
- intro 전용 UI
- 질문볼 reveal 문구
- 관련 CSS
제외:
- phase 모델 변경 금지

4. `loader/evaluator 정리`
파일 범위:
- `src/gameContent.ts`
- `src/evaluateBattle.ts`
제외:
- UI/CSS 변경 금지

## 권장 순서
1. contract 고정
2. logic 단위 경쟁
3. UI 단위 경쟁
4. polish 단위 경쟁
5. 채택안 통합
