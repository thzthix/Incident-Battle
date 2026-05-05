# Scenario JSON Schema v1

## Purpose

Define the first-playable JSON content shape that the frontend can consume without scenario-specific branching.

This is not a formal JSON Schema file yet.
It is the contract we should freeze before implementation.

## Design Goals

- one shape for all first-playable scenarios
- easy to mock locally
- easy to render in a phase-based battle flow
- clear separation between content and scoring logic

## Top-Level Shape

```json
{
  "id": "deploy-login-failure-01",
  "title": "배포 직후 로그인 실패",
  "theme": "배포와 변경",
  "difficulty": "light",
  "archetype": "deploy-regression",
  "companyFlavor": "fintech-bank",
  "opponentIntroLine": "토스뱅크풍 면접관이 승부를 걸어왔다!",
  "openingGoalLine": "먼저 무엇을 확인할지 정하자",
  "fullIncidentBrief": "....",
  "realismAnchors": {},
  "startingStateIds": [],
  "openingRevealLines": [],
  "turns": [],
  "followups": [],
  "finalCoaching": {}
}
```

## Field Contract

### Identity Fields

- `id: string`
- `title: string`
- `theme: "배포와 변경" | "트래픽과 병목" | "결제와 의존성" | "랜덤 승부"`
- `difficulty: "light" | "standard" | "hard"`
- `archetype: string`
- `companyFlavor: string`

### Intro Fields

- `opponentIntroLine: string`
- `openingGoalLine: string`
- `fullIncidentBrief: string`

### Realism Anchors

```json
{
  "timeContext": "점심 직전 배포 10분 후",
  "impactSurface": "모바일 앱 로그인",
  "measurableSignals": [
    "실패율 2% -> 18%",
    "인증 API timeout 0.7% -> 11%"
  ],
  "contradictoryClue": "웹 로그인은 정상이고 앱 서버 CPU도 높지 않다.",
  "constraint": "점심 직전 핵심 진입 흐름이라 오래 막을 수 없다.",
  "wrongMoveRisk": "성급한 롤백은 설정 불일치를 키울 수 있다."
}
```

Required fields:

- `timeContext`
- `impactSurface`
- `measurableSignals`
- `contradictoryClue`
- `constraint`
- `wrongMoveRisk`

## Opening Reveal Lines

```json
[
  "변경 흔적이 진하게 남아 있다!",
  "배포 10분 뒤 모바일 로그인 실패율이 2%에서 18%로 뛰었다.",
  "급한 불이 번지고 있다!",
  "실패는 웹이 아니라 모바일 앱 최신 버전에 집중되고 있다."
]
```

Rules:

- `4~6` lines
- each line should be textbox-ready
- each line should be one beat long

## Turn Shape

```json
{
  "turnNumber": 1,
  "goalLine": "먼저 무엇을 확인할지 정하자",
  "question": "이 상황에서 가장 먼저 무엇을 확인하시겠습니까?",
  "candidateActionIds": [
    "scope-check",
    "change-trace",
    "observability-check",
    "priority-call"
  ],
  "bestActionIds": ["scope-check", "change-trace"],
  "strongAnswerPoints": [
    "영향 범위를 먼저 본다",
    "최근 변경과 시점을 대조한다"
  ],
  "commonMistakes": [
    "근거 없이 전체 롤백부터 말한다",
    "영향도 없이 디버깅으로만 들어간다"
  ],
  "revealLines": [],
  "newStateIds": [],
  "resolvedStateIds": [],
  "dimmedStateIds": []
}
```

### Turn Field Rules

Required:

- `turnNumber`
- `goalLine`
- `question`
- `candidateActionIds`
- `strongAnswerPoints`
- `commonMistakes`

Optional:

- `bestActionIds`
- `revealLines`
- `newStateIds`
- `resolvedStateIds`
- `dimmedStateIds`

Turn-specific rules:

- turn 1:
  - `revealLines` should usually be empty because opening reveal already happened
- turn 2:
  - should usually have `1~3` reveal lines
- turn 3:
  - should usually have `1~3` reveal lines

## Follow-Up Shape

```json
{
  "afterTurn": 1,
  "techniqueLabel": "되물림",
  "flavorLine": "면접관의 되물림!",
  "questionLine": "좋습니다. 그런데 최근 배포와의 관련성은 어떻게 빠르게 확인하시겠습니까?"
}
```

Rules:

- exactly `3` follow-ups in first playable
- one for each turn
- `techniqueLabel` is short and textbox-top friendly
- `questionLine` must fit one textbox step

## Final Coaching Shape

```json
{
  "strengths": [
    "사용자 영향부터 본 점이 좋았습니다."
  ],
  "misses": [
    "복구 수단의 안전성 기준을 조금 더 분명히 말할 수 있습니다."
  ],
  "betterAnswerDirection": "영향 파악 -> 최근 변경 대조 -> 안전한 완화 -> 복구 확인 순서로 답하면 더 강합니다."
}
```

Required:

- `strengths`
- `misses`
- `betterAnswerDirection`

## Frontend Companion Types

Suggested TypeScript model:

```ts
type ScenarioTheme =
  | "배포와 변경"
  | "트래픽과 병목"
  | "결제와 의존성"
  | "랜덤 승부";

type ScenarioDifficulty = "light" | "standard" | "hard";

type ScenarioContent = {
  id: string;
  title: string;
  theme: ScenarioTheme;
  difficulty: ScenarioDifficulty;
  archetype: string;
  companyFlavor: string;
  opponentIntroLine: string;
  openingGoalLine: string;
  fullIncidentBrief: string;
  realismAnchors: RealismAnchors;
  startingStateIds: string[];
  openingRevealLines: string[];
  turns: ScenarioTurn[];
  followups: ScenarioFollowup[];
  finalCoaching: FinalCoaching;
};
```

## Mapping To Current Files

Existing source files already contain parts of this contract:

- scenario data:
  - [data/scenarios.v1.json](/Users/seoha/Documents/Codex/2026-05-05-cs/data/scenarios.v1.json)
- states:
  - [data/states.v1.json](/Users/seoha/Documents/Codex/2026-05-05-cs/data/states.v1.json)
- actions:
  - [data/actions.v1.json](/Users/seoha/Documents/Codex/2026-05-05-cs/data/actions.v1.json)

The next normalization pass should align the first 5 scenarios to this shape before React implementation begins.
