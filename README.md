# Incident Battle

Incident Battle는 시나리오 질문 대응을 포켓몬식 전투 리듬으로 연습하는 React 기반 웹앱 프로토타입이다.

## 현재 상태
- React + TypeScript + Vite 첫 플레이어블 기반 완료
- `setup -> theme select -> battle intro -> 3턴 -> result` 흐름 동작
- 시나리오/행동/상태 데이터는 JSON으로 분리됨
- 하네스 문서와 judge 템플릿이 준비됨

## 스크립트
- `npm run dev`: 개발 서버 실행
- `npm run typecheck`: 타입 체크만 실행
- `npm run build`: 타입체크 + 프로덕션 빌드
- `npm run preview`: 빌드 결과 로컬 미리보기

## 주요 문서
- `AGENTS.md`: 작업 규칙
- `docs/implementation-harness-v2.md`: 하네스 기본 원칙
- `docs/judge-sheet-template.md`: 평가 시트 템플릿
- `docs/subagent-task-template.md`: 서브에이전트 작업 지시 템플릿
- `docs/harness-competition-units.md`: 경쟁 단위 분리 기준
- `docs/harness-cycle-01.md`: 다음 경쟁 사이클 계획

## 현재 우선순위
1. `턴 인터랙션 패널` 경쟁 구현
2. `결과 피드백 패널` 경쟁 구현
3. `인트로 케이던스` polish

## GitHub Pages 배포
- 이 프로젝트는 `GitHub Pages` 기준으로 `base=/Incident-Battle/`가 설정돼 있다.
- 자동 배포는 `main` 브랜치 push 시 실행된다.
- 현재 브랜치에서 먼저 올려보고 싶으면 GitHub Actions에서 `Deploy to GitHub Pages` 워크플로를 수동 실행하면 된다.
- Pages URL 예시: `https://thzthix.github.io/Incident-Battle/`

### 배포 전 체크
1. `npm run build`
2. 필요하면 `npm run preview`로 로컬 미리보기
3. `main`에 머지하거나 Actions 수동 실행
