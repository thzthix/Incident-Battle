import { useEffect, useMemo, useReducer } from 'react';
import { battleReducer, initialBattleState } from './battleReducer';
import { buildFinalResult, evaluateTurn, resolveStateIds } from './evaluateBattle';
import { createIntroDialogue, getScenarioForTheme, themeCards } from './gameContent';
import { BattleScene } from './components/BattleScene';
import { ResultPanel } from './components/ResultPanel';
import { SetupScreen } from './components/SetupScreen';
import { ThemeSelectScreen } from './components/ThemeSelectScreen';
import { TitleScreen } from './components/TitleScreen';
import { TurnPanel } from './components/TurnPanel';

const bodyThemeByThemeId = {
  deploy: 'deploy',
  traffic: 'traffic',
  payment: 'payment',
  random: 'deploy',
} as const;

function App() {
  const [state, dispatch] = useReducer(battleReducer, initialBattleState);

  const previewScenario = useMemo(() => getScenarioForTheme(state.selectedThemeId), [state.selectedThemeId]);
  const scenario = state.scenario;
  const activeTurn = scenario?.turns[state.turnIndex] ?? null;
  const lastTurnResult = state.turnResults[state.turnResults.length - 1] ?? null;
  const activeDialogueLine = state.dialogueLines[state.dialogueIndex] ?? null;

  useEffect(() => {
    document.body.dataset.theme = bodyThemeByThemeId[state.selectedThemeId];
  }, [state.selectedThemeId]);

  const handleStartBattle = () => {
    const nextScenario = getScenarioForTheme(state.selectedThemeId);
    dispatch({
      type: 'START_BATTLE',
      scenario: nextScenario,
      dialogueLines: createIntroDialogue(nextScenario, state.companyName || '지원 회사'),
    });
  };

  const handleSubmitTurn = () => {
    if (!scenario || !activeTurn || !state.selectedActionId || state.answerText.trim().length < 8) {
      return;
    }

    const trimmedAnswer = state.answerText.trim();
    const result = evaluateTurn(activeTurn, trimmedAnswer, state.selectedActionId, state.activeStateIds);
    const followup = scenario.followups.find((item) => item.afterTurn === activeTurn.turnNumber) ?? null;

    dispatch({ type: 'SUBMIT_TURN' });
    window.setTimeout(() => {
      dispatch({ type: 'RESOLVE_TURN', result, followup });
    }, 240);
  };

  const handleContinueFromResolution = () => {
    if (!scenario || !activeTurn) {
      return;
    }

    if (state.currentFollowup) {
      dispatch({ type: 'SHOW_FOLLOWUP' });
      return;
    }

    dispatch({
      type: 'OPEN_STATE_UPDATE',
      activeStateIds: resolveStateIds(activeTurn, state.activeStateIds, state.dimmedStateIds).nextActiveStateIds,
      dimmedStateIds: resolveStateIds(activeTurn, state.activeStateIds, state.dimmedStateIds).nextDimmedStateIds,
    });
  };

  const handleFollowupReveal = () => {
    if (!activeTurn) {
      return;
    }

    dispatch({
      type: 'OPEN_STATE_UPDATE',
      activeStateIds: resolveStateIds(activeTurn, state.activeStateIds, state.dimmedStateIds).nextActiveStateIds,
      dimmedStateIds: resolveStateIds(activeTurn, state.activeStateIds, state.dimmedStateIds).nextDimmedStateIds,
    });
  };

  const handleAdvanceStateUpdate = () => {
    if (!scenario) {
      return;
    }

    const isLastTurn = state.turnIndex >= scenario.turns.length - 1;
    if (isLastTurn) {
      dispatch({ type: 'FINISH_BATTLE', finalResult: buildFinalResult(scenario, state.turnResults) });
      return;
    }

    dispatch({ type: 'ADVANCE_TURN' });
  };

  const handleReplay = () => {
    if (!scenario) {
      return;
    }

    dispatch({ type: 'REPLAY_SCENARIO', dialogueLines: createIntroDialogue(scenario, state.companyName) });
  };

  return (
    <main className="app-shell">
      <div className="screen-noise" />
      <div className="app-grid">
        {state.phase === 'title' && (
          <TitleScreen
            previewTheme={themeCards.find((card) => card.id === state.selectedThemeId) ?? themeCards[0]!}
            onStart={() => dispatch({ type: 'GO_TO_SETUP' })}
          />
        )}

        {state.phase === 'setup' && (
          <SetupScreen
            companyName={state.companyName}
            playerName={state.playerName}
            onCompanyNameChange={(value) => dispatch({ type: 'UPDATE_COMPANY_NAME', value: value || '지원 회사' })}
            onPlayerNameChange={(value) => dispatch({ type: 'UPDATE_PLAYER_NAME', value: value || '지원자' })}
            onContinue={() => dispatch({ type: 'GO_TO_THEME_SELECT' })}
          />
        )}

        {state.phase === 'theme_select' && (
          <ThemeSelectScreen
            themeCards={themeCards}
            selectedThemeId={state.selectedThemeId}
            previewScenario={previewScenario}
            onSelectTheme={(themeId) => dispatch({ type: 'SELECT_THEME', themeId })}
            onStartBattle={handleStartBattle}
            onBack={() => dispatch({ type: 'GO_TO_SETUP' })}
          />
        )}

        {scenario && state.phase !== 'title' && state.phase !== 'setup' && state.phase !== 'theme_select' && (
          <>
            <BattleScene
              companyName={state.companyName}
              playerName={state.playerName}
              scenario={scenario}
              floatingLabel={state.floatingLabel}
              activeStateIds={state.activeStateIds}
              dimmedStateIds={state.dimmedStateIds}
              activeTurn={activeTurn}
              dialogueLine={state.phase === 'battle_intro' ? activeDialogueLine : null}
              selectedActionId={state.selectedActionId}
              showIncidentBrief={state.showIncidentBrief}
              onToggleBrief={() => dispatch({ type: 'TOGGLE_INCIDENT_BRIEF' })}
            />

            {state.phase === 'final_result' && state.finalResult ? (
              <ResultPanel
                scenario={scenario}
                finalResult={state.finalResult}
                onReplay={handleReplay}
                onReset={() => dispatch({ type: 'BACK_TO_TITLE' })}
              />
            ) : (
              <TurnPanel
                phase={state.phase}
                turn={activeTurn}
                selectedActionId={state.selectedActionId}
                answerText={state.answerText}
                lastTurnResult={lastTurnResult}
                currentFollowup={state.currentFollowup}
                onAdvanceIntro={() => dispatch({ type: 'ADVANCE_INTRO' })}
                onSelectAction={(actionId) => dispatch({ type: 'SELECT_ACTION', actionId })}
                onAnswerChange={(value) => dispatch({ type: 'UPDATE_ANSWER', value })}
                onSubmitTurn={handleSubmitTurn}
                onContinueFromResolution={handleContinueFromResolution}
                onContinueFromFollowup={handleFollowupReveal}
                onAdvanceStateUpdate={handleAdvanceStateUpdate}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default App;
