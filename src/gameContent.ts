import actionsData from '../data/actions.v1.json';
import scenariosData from '../data/scenarios.first-playable.v1.json';
import statesData from '../data/states.v1.json';
import type { ActionContent, DialogueLine, ScenarioContent, ScenarioTheme, StateContent, ThemeCard, ThemeId } from './types';

export const scenarios = scenariosData as ScenarioContent[];
export const actions = actionsData as ActionContent[];
export const states = statesData as StateContent[];

export const actionsById = Object.fromEntries(actions.map((action) => [action.id, action])) as Record<string, ActionContent>;
export const statesById = Object.fromEntries(states.map((state) => [state.id, state])) as Record<string, StateContent>;

export const themeCards: ThemeCard[] = [
  {
    id: 'deploy',
    title: '배포와 변경',
    description: '배포 직후 증상, 설정 차이, 안전한 롤백 판단을 연습합니다.',
    previewStateLabel: '변경 흔적',
  },
  {
    id: 'traffic',
    title: '트래픽과 병목',
    description: '과부하, 느린 저장소, 캐시 붕괴 속에서 우선순위를 세웁니다.',
    previewStateLabel: '과부하',
  },
  {
    id: 'payment',
    title: '결제와 의존성',
    description: '외부 제약과 정합성 리스크 속에서 복구와 소통을 같이 봅니다.',
    previewStateLabel: '묶인 회선',
  },
  {
    id: 'random',
    title: '랜덤 승부',
    description: '대표 시나리오를 랜덤하게 골라 실전 감각을 확인합니다.',
    previewStateLabel: '예측 불가',
  },
];

const themeIdByTheme: Record<Exclude<ScenarioTheme, '랜덤 승부'>, ThemeId> = {
  '배포와 변경': 'deploy',
  '트래픽과 병목': 'traffic',
  '결제와 의존성': 'payment',
};

export function themeToId(theme: ScenarioTheme): ThemeId {
  return theme === '랜덤 승부' ? 'random' : themeIdByTheme[theme];
}

export function getScenarioListForTheme(themeId: ThemeId): ScenarioContent[] {
  if (themeId === 'random') {
    return scenarios;
  }

  return scenarios.filter((scenario) => themeToId(scenario.theme) === themeId);
}

export function getScenarioForTheme(themeId: ThemeId): ScenarioContent {
  const list = getScenarioListForTheme(themeId);
  return list[0] ?? scenarios[0]!;
}

export function createIntroDialogue(scenario: ScenarioContent, companyName: string): DialogueLine[] {
  const revealLines: DialogueLine[] = scenario.openingRevealLines.map((line, index) => ({
    id: `opening-${index}`,
    speaker: index % 2 === 0 ? 'system' : 'coach',
    text: line,
  }));

  return [
    {
      id: 'intro-opponent',
      speaker: 'interviewer',
      text: scenario.opponentIntroLine.replace(/[^\s]+풍/, `${companyName}풍`),
    },
    {
      id: 'intro-throw',
      speaker: 'system',
      text: '면접관이 질문볼을 던졌다!',
    },
    {
      id: 'intro-appearance',
      speaker: 'system',
      text: `[${scenario.title}] 시나리오가 나타났다!`,
    },
    ...revealLines,
    {
      id: 'intro-goal',
      speaker: 'coach',
      text: scenario.openingGoalLine,
    },
  ];
}
