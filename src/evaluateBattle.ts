import { actionsById, statesById } from './gameContent';
import type { FinalResult, ScenarioContent, ScenarioTurn, TurnResult, TurnScoreBreakdown } from './types';

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function containsAny(text: string, phrases: string[]): boolean {
  return phrases.some((phrase) => text.includes(phrase));
}

function buildBreakdown(score: number): TurnScoreBreakdown {
  return {
    triage: clampScore(score + 6),
    diagnosis: clampScore(score + 2),
    mitigation: clampScore(score),
    communication: clampScore(score - 4),
    reasoning: clampScore(score + 4),
  };
}

export function evaluateTurn(turn: ScenarioTurn, answer: string, actionId: string, activeStateIds: string[]): TurnResult {
  const normalizedAnswer = answer.trim().toLowerCase();
  const action = actionsById[actionId];
  const bestAction = turn.bestActionIds.includes(actionId);
  const activeStates = activeStateIds.map((stateId) => statesById[stateId]).filter(Boolean);

  const matchedPoints = turn.strongAnswerPoints.filter((point) => {
    const keywords = point
      .replace(/[(),.%]/g, ' ')
      .split(/\s+/)
      .filter((token) => token.length >= 2)
      .slice(0, 4);
    return containsAny(normalizedAnswer, keywords);
  });
  const missedPoints = turn.strongAnswerPoints.filter((point) => !matchedPoints.includes(point));
  const matchedMistakes = turn.commonMistakes.filter((mistake) => {
    const keywords = mistake
      .replace(/[(),.%]/g, ' ')
      .split(/\s+/)
      .filter((token) => token.length >= 2)
      .slice(0, 4);
    return containsAny(normalizedAnswer, keywords);
  });

  const stateSynergy = activeStates.filter((battleState) => battleState.strongActionIds.includes(actionId)).length;
  const tagSynergy = activeStates.some((battleState) => battleState.tags.some((tag) => action.strongAgainstTags.includes(tag)));

  const rawScore =
    44 +
    matchedPoints.length * 12 +
    stateSynergy * 8 +
    (bestAction ? 12 : 0) +
    (tagSynergy ? 6 : 0) +
    Math.min(answer.trim().length, 140) / 10 -
    matchedMistakes.length * 12;

  const score = clampScore(rawScore);

  const effectivenessLine =
    score >= 80
      ? '효과는 굉장했다!'
      : score >= 65
        ? '좋은 흐름이다.'
        : score >= 45
          ? '어떻게든 버텨냈다...'
          : '효과가 별로인 것 같다...';

  const resultLine = bestAction
    ? `${action.label} 선택이 현재 전장의 핵심 압박을 제대로 건드렸습니다.`
    : `${action.label} 선택이 완전히 빗나간 건 아니지만, 이번 턴의 핵심 압박을 정면으로 받기에는 조금 약합니다.`;

  const coachLine =
    matchedPoints.length > 0
      ? `좋은 점: ${matchedPoints[0]}`
      : '좋은 점: 답변 길이는 충분합니다. 이제 사용자 영향, 확인 순서, 조건부 대응을 더 선명하게 말하면 좋습니다.';

  const missLine = missedPoints[0] ?? turn.commonMistakes[0] ?? '사용자 영향과 다음 확인 항목을 더 짧고 분명하게 끊어보세요.';

  return {
    turnNumber: turn.turnNumber,
    actionId,
    actionLabel: action.label,
    score,
    breakdown: buildBreakdown(score),
    effectivenessLine,
    resultLine,
    coachLine,
    missLine,
    matchedPoints,
    missedPoints,
  };
}

export function resolveStateIds(turn: ScenarioTurn, activeStateIds: string[], dimmedStateIds: string[]) {
  const nextActiveStateIds = activeStateIds
    .filter((stateId) => !turn.resolvedStateIds.includes(stateId))
    .concat(turn.newStateIds.filter((stateId) => !activeStateIds.includes(stateId)));

  const nextDimmedStateIds = Array.from(new Set([...dimmedStateIds, ...turn.dimmedStateIds]));

  return {
    nextActiveStateIds,
    nextDimmedStateIds,
  };
}

export function buildFinalResult(scenario: ScenarioContent, turnResults: TurnResult[]): FinalResult {
  const totals = turnResults.reduce<TurnScoreBreakdown>(
    (acc, result) => ({
      triage: acc.triage + result.breakdown.triage,
      diagnosis: acc.diagnosis + result.breakdown.diagnosis,
      mitigation: acc.mitigation + result.breakdown.mitigation,
      communication: acc.communication + result.breakdown.communication,
      reasoning: acc.reasoning + result.breakdown.reasoning,
    }),
    {
      triage: 0,
      diagnosis: 0,
      mitigation: 0,
      communication: 0,
      reasoning: 0,
    },
  );

  const divisor = Math.max(turnResults.length, 1);
  const categoryScores: TurnScoreBreakdown = {
    triage: clampScore(totals.triage / divisor),
    diagnosis: clampScore(totals.diagnosis / divisor),
    mitigation: clampScore(totals.mitigation / divisor),
    communication: clampScore(totals.communication / divisor),
    reasoning: clampScore(totals.reasoning / divisor),
  };

  const totalScore = clampScore(
    (categoryScores.triage +
      categoryScores.diagnosis +
      categoryScores.mitigation +
      categoryScores.communication +
      categoryScores.reasoning) /
      5,
  );

  const rankLabel =
    totalScore >= 85 ? '침착한 대응' : totalScore >= 70 ? '좋은 흐름' : totalScore >= 55 ? '버티는 중' : '재정비 필요';

  return {
    totalScore,
    rankLabel,
    categoryScores,
    strengths: scenario.finalCoaching.strengths,
    misses: scenario.finalCoaching.misses,
    betterAnswerDirection: scenario.finalCoaching.betterAnswerDirection,
  };
}
