export type ThemeId = 'deploy' | 'traffic' | 'payment' | 'random';

export type ScenarioTheme = '배포와 변경' | '트래픽과 병목' | '결제와 의존성' | '랜덤 승부';

export type BattlePhase =
  | 'title'
  | 'setup'
  | 'theme_select'
  | 'battle_intro'
  | 'action_select'
  | 'answer_input'
  | 'judge_buffer'
  | 'turn_resolution'
  | 'followup_reveal'
  | 'state_update'
  | 'final_result';

export type ScenarioDifficulty = 'light' | 'standard' | 'hard';

export type DialogueSpeaker = 'system' | 'interviewer' | 'coach';

export type DialogueLine = {
  id: string;
  speaker: DialogueSpeaker;
  text: string;
};

export type RealismAnchors = {
  timeContext: string;
  impactSurface: string;
  measurableSignals: string[];
  contradictoryClue: string;
  constraint: string;
  wrongMoveRisk: string;
};

export type ScenarioTurn = {
  turnNumber: number;
  goalLine: string;
  question: string;
  candidateActionIds: string[];
  bestActionIds: string[];
  strongAnswerPoints: string[];
  commonMistakes: string[];
  revealLines: string[];
  newStateIds: string[];
  resolvedStateIds: string[];
  dimmedStateIds: string[];
};

export type ScenarioFollowup = {
  afterTurn: number;
  techniqueLabel: string;
  flavorLine: string;
  questionLine: string;
};

export type FinalCoaching = {
  strengths: string[];
  misses: string[];
  betterAnswerDirection: string;
};

export type ScenarioContent = {
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

export type ActionContent = {
  id: string;
  category: 'recon' | 'mitigation' | 'judgment' | 'communication';
  label: string;
  battleFlavorText: string;
  intentTags: string[];
  strongAgainstTags: string[];
  weakAgainstTags: string[];
};

export type StateContent = {
  id: string;
  category: string;
  battleName: string;
  shortDescription: string;
  interviewMeaning: string;
  strongActionIds: string[];
  tags: string[];
};

export type ThemeCard = {
  id: ThemeId;
  title: string;
  description: string;
  previewStateLabel: string;
};

export type TurnScoreBreakdown = {
  triage: number;
  diagnosis: number;
  mitigation: number;
  communication: number;
  reasoning: number;
};

export type TurnResult = {
  turnNumber: number;
  actionId: string;
  actionLabel: string;
  score: number;
  breakdown: TurnScoreBreakdown;
  effectivenessLine: string;
  resultLine: string;
  coachLine: string;
  missLine: string;
  matchedPoints: string[];
  missedPoints: string[];
};

export type FinalResult = {
  totalScore: number;
  rankLabel: string;
  categoryScores: TurnScoreBreakdown;
  strengths: string[];
  misses: string[];
  betterAnswerDirection: string;
};
