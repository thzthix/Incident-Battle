# Implementation Harness v2

## Principle
점수 하나로 끝내지 않고, 센서를 순차 통과시키는 judge loop를 사용한다.

## Hard Gate
1. 타입체크 통과
2. 빌드 통과
3. contract 위반 없음
4. setup -> intro -> 3턴 -> result 완주 가능

## Review Sensors
1. 구조: reducer와 UI 책임이 분리되어 있는가
2. UX: 텍스트박스 중심 리듬이 살아 있는가
3. 테마: DPPT풍 전투 문법이 느껴지는가
4. 회귀: 대표 시나리오 2개 이상에서 깨지지 않는가

## Adoption Rule
- hard gate 통과 + 92점 이상: 채택
- hard gate 통과 + 88~91점: 비교 우위 있으면 조건부 채택
- hard gate 미통과: 탈락

## Required Feedback
- 문제
- 왜 문제인지
- 유지할 것
- 고칠 것
- 다음 제출 조건
