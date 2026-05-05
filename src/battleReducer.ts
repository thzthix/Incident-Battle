import { actionsById } from './gameContent';
import type { BattlePhase, DialogueLine, FinalResult, ScenarioContent, ScenarioFollowup, ThemeId, TurnResult } from './types';

export type BattleState = {
  phase: BattlePhase;
  companyName: string;
  playerName: string;
  selectedThemeId: ThemeId;
  scenario: ScenarioContent | null;
  turnIndex: number;
  activeStateIds: string[];
  dimmedStateIds: string[];
  selectedActionId: string;
  answerText: string;
  turnResults: TurnResult[];
  currentFollowup: ScenarioFollowup | null;
  finalResult: FinalResult | null;
  dialogueLines: DialogueLine[];
  dialogueIndex: number;
  floatingLabel: string;
  showIncidentBrief: boolean;
};

export type BattleAction =
  | { type: 'GO_TO_SETUP' }
  | { type: 'UPDATE_COMPANY_NAME'; value: string }
  | { type: 'UPDATE_PLAYER_NAME'; value: string }
  | { type: 'GO_TO_THEME_SELECT' }
  | { type: 'SELECT_THEME'; themeId: ThemeId }
  | { type: 'START_BATTLE'; scenario: ScenarioContent; dialogueLines: DialogueLine[] }
  | { type: 'ADVANCE_INTRO' }
  | { type: 'SELECT_ACTION'; actionId: string }
  | { type: 'UPDATE_ANSWER'; value: string }
  | { type: 'SUBMIT_TURN' }
  | { type: 'RESOLVE_TURN'; result: TurnResult; followup: ScenarioFollowup | null }
  | { type: 'SHOW_FOLLOWUP' }
  | { type: 'OPEN_STATE_UPDATE'; activeStateIds: string[]; dimmedStateIds: string[] }
  | { type: 'ADVANCE_TURN' }
  | { type: 'FINISH_BATTLE'; finalResult: FinalResult }
  | { type: 'REPLAY_SCENARIO'; dialogueLines: DialogueLine[] }
  | { type: 'BACK_TO_TITLE' }
  | { type: 'TOGGLE_INCIDENT_BRIEF' };

export const initialBattleState: BattleState = {
  phase: 'title',
  companyName: '지원 회사',
  playerName: '지원자',
  selectedThemeId: 'deploy',
  scenario: null,
  turnIndex: 0,
  activeStateIds: [],
  dimmedStateIds: [],
  selectedActionId: '',
  answerText: '',
  turnResults: [],
  currentFollowup: null,
  finalResult: null,
  dialogueLines: [],
  dialogueIndex: 0,
  floatingLabel: '질문볼 준비 완료',
  showIncidentBrief: false,
};

export function battleReducer(state: BattleState, action: BattleAction): BattleState {
  switch (action.type) {
    case 'GO_TO_SETUP':
      return {
        ...state,
        phase: 'setup',
      };
    case 'UPDATE_COMPANY_NAME':
      return {
        ...state,
        companyName: action.value,
      };
    case 'UPDATE_PLAYER_NAME':
      return {
        ...state,
        playerName: action.value,
      };
    case 'GO_TO_THEME_SELECT':
      return {
        ...state,
        phase: 'theme_select',
      };
    case 'SELECT_THEME':
      return {
        ...state,
        selectedThemeId: action.themeId,
      };
    case 'START_BATTLE':
      return {
        ...state,
        phase: 'battle_intro',
        scenario: action.scenario,
        turnIndex: 0,
        activeStateIds: [...action.scenario.startingStateIds],
        dimmedStateIds: [],
        selectedActionId: action.scenario.turns[0]?.candidateActionIds[0] ?? '',
        answerText: '',
        turnResults: [],
        currentFollowup: null,
        finalResult: null,
        dialogueLines: action.dialogueLines,
        dialogueIndex: 0,
        floatingLabel: action.scenario.theme,
        showIncidentBrief: false,
      };
    case 'ADVANCE_INTRO': {
      const nextIndex = state.dialogueIndex + 1;
      const isLastLine = nextIndex >= state.dialogueLines.length;

      if (isLastLine) {
        return {
          ...state,
          phase: 'action_select',
          dialogueLines: [],
          dialogueIndex: 0,
          floatingLabel: state.scenario?.turns[0]?.goalLine ?? '1턴 시작',
        };
      }

      return {
        ...state,
        dialogueIndex: nextIndex,
      };
    }
    case 'SELECT_ACTION':
      return {
        ...state,
        phase: 'answer_input',
        selectedActionId: action.actionId,
        floatingLabel: actionsById[action.actionId]?.label ?? action.actionId,
      };
    case 'UPDATE_ANSWER':
      return {
        ...state,
        answerText: action.value,
      };
    case 'SUBMIT_TURN':
      return {
        ...state,
        phase: 'judge_buffer',
        floatingLabel: '판정 중',
      };
    case 'RESOLVE_TURN':
      return {
        ...state,
        phase: 'turn_resolution',
        turnResults: [...state.turnResults, action.result],
        currentFollowup: action.followup,
        floatingLabel: action.result.effectivenessLine,
      };
    case 'SHOW_FOLLOWUP':
      return {
        ...state,
        phase: 'followup_reveal',
        floatingLabel: state.currentFollowup?.techniqueLabel ?? '되물림',
      };
    case 'OPEN_STATE_UPDATE':
      return {
        ...state,
        phase: 'state_update',
        activeStateIds: action.activeStateIds,
        dimmedStateIds: action.dimmedStateIds,
        floatingLabel: '전장 갱신',
      };
    case 'ADVANCE_TURN': {
      if (!state.scenario) {
        return state;
      }
      const nextTurnIndex = state.turnIndex + 1;
      const nextTurn = state.scenario.turns[nextTurnIndex];
      return {
        ...state,
        phase: 'action_select',
        turnIndex: nextTurnIndex,
        selectedActionId: nextTurn?.candidateActionIds[0] ?? '',
        answerText: '',
        currentFollowup: null,
        floatingLabel: nextTurn?.goalLine ?? '다음 턴',
        showIncidentBrief: false,
      };
    }
    case 'FINISH_BATTLE':
      return {
        ...state,
        phase: 'final_result',
        finalResult: action.finalResult,
        currentFollowup: null,
        answerText: '',
        floatingLabel: action.finalResult.rankLabel,
      };
    case 'REPLAY_SCENARIO':
      if (!state.scenario) {
        return state;
      }
      return {
        ...state,
        phase: 'battle_intro',
        turnIndex: 0,
        activeStateIds: [...state.scenario.startingStateIds],
        dimmedStateIds: [],
        selectedActionId: state.scenario.turns[0]?.candidateActionIds[0] ?? '',
        answerText: '',
        turnResults: [],
        currentFollowup: null,
        finalResult: null,
        dialogueLines: action.dialogueLines,
        dialogueIndex: 0,
        floatingLabel: state.scenario.theme,
        showIncidentBrief: false,
      };
    case 'BACK_TO_TITLE':
      return initialBattleState;
    case 'TOGGLE_INCIDENT_BRIEF':
      return {
        ...state,
        showIncidentBrief: !state.showIncidentBrief,
      };
    default:
      return state;
  }
}
