import { actionsById, statesById } from '../gameContent';
import type {
  BattlePhase,
  DialogueLine,
  ScenarioContent,
  ScenarioFollowup,
  ScenarioTurn,
  TurnResult,
} from '../types';

type TurnPanelProps = {
  phase: BattlePhase;
  scenario: ScenarioContent;
  turn: ScenarioTurn | null;
  dialogueLine: DialogueLine | null;
  selectedActionId: string;
  answerText: string;
  lastTurnResult: TurnResult | null;
  currentFollowup: ScenarioFollowup | null;
  showIncidentBrief: boolean;
  onToggleBrief: () => void;
  onAdvanceIntro: () => void;
  onSelectAction: (actionId: string) => void;
  onAnswerChange: (value: string) => void;
  onSubmitTurn: () => void;
  onContinueFromResolution: () => void;
  onContinueFromFollowup: () => void;
  onAdvanceStateUpdate: () => void;
};

const speakerLabel: Record<DialogueLine['speaker'], string> = {
  system: 'SYSTEM',
  interviewer: 'INTERVIEWER',
  coach: 'COACH',
};

export function TurnPanel({
  phase,
  scenario,
  turn,
  dialogueLine,
  selectedActionId,
  answerText,
  lastTurnResult,
  currentFollowup,
  showIncidentBrief,
  onToggleBrief,
  onAdvanceIntro,
  onSelectAction,
  onAnswerChange,
  onSubmitTurn,
  onContinueFromResolution,
  onContinueFromFollowup,
  onAdvanceStateUpdate,
}: TurnPanelProps) {
  const trimmedAnswer = answerText.trim();
  const selectedAction = selectedActionId ? actionsById[selectedActionId] : null;
  const canSubmit = Boolean(selectedActionId) && trimmedAnswer.length >= 8 && phase !== 'judge_buffer';
  const answerLength = trimmedAnswer.length;

  if (!turn && phase !== 'battle_intro') {
    return null;
  }

  if (phase === 'battle_intro') {
    return (
      <section className="panel command-panel">
        <div className="command-shell">
          <div className="battle-textbox">
            <div className="battle-textbox-topline">
              <span className="battle-textbox-speaker">{dialogueLine ? speakerLabel[dialogueLine.speaker] : 'SYSTEM'}</span>
              <button type="button" className="battle-brief-button" onClick={onToggleBrief}>
                {showIncidentBrief ? '사건 접기' : '사건 보기'}
              </button>
            </div>
            <div className="battle-textbox-body">
              <p className="battle-text-line">{dialogueLine?.text ?? '질문볼이 흔들리고 있다!'}</p>
            </div>
          </div>

          <div className="battle-command-menu battle-command-menu-single">
            <button type="button" className="battle-menu-button is-primary" onClick={onAdvanceIntro}>
              다음
            </button>
          </div>
        </div>

        {showIncidentBrief && (
          <div className="battle-brief-box">
            <strong className="battle-brief-title">INCIDENT BRIEF</strong>
            <p>{scenario.fullIncidentBrief}</p>
          </div>
        )}
      </section>
    );
  }

  if (!turn) {
    return null;
  }

  if (phase === 'action_select' || phase === 'answer_input' || phase === 'judge_buffer') {
    return (
      <section className="panel command-panel">
        <div className="command-shell">
          <div className="battle-textbox">
            <div className="battle-textbox-topline">
              <span className="battle-textbox-speaker">TURN {turn.turnNumber}</span>
              <button type="button" className="battle-brief-button" onClick={onToggleBrief}>
                {showIncidentBrief ? '사건 접기' : '사건 보기'}
              </button>
            </div>
            <div className="battle-textbox-body">
              <p className="battle-text-line">{turn.question}</p>
              <p className="battle-text-line is-muted">
                {selectedAction
                  ? `지원자의 ${selectedAction.label}! ${selectedAction.battleFlavorText}`
                  : '무슨 기술을 꺼내겠는가? 우하단 4개의 대응 기술 중 하나를 고르세요.'}
              </p>
            </div>
          </div>

          <div className="battle-command-menu">
            {turn.candidateActionIds.map((actionId) => {
              const action = actionsById[actionId];
              const selected = selectedActionId === actionId;
              return (
                <button
                  key={actionId}
                  type="button"
                  className={`battle-menu-button ${selected ? 'is-selected' : ''}`}
                  onClick={() => onSelectAction(actionId)}
                  aria-pressed={selected}
                >
                  <span className="battle-menu-label">{action.label}</span>
                  <span className="battle-menu-meta">{action.category.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="battle-input-tray">
          <div className="battle-input-header">
            <strong>{selectedAction ? `${selectedAction.label} 설명 입력` : '기술을 먼저 고르세요'}</strong>
            <span>{answerLength}자</span>
          </div>
          <textarea
            rows={3}
            value={answerText}
            onChange={(event) => onAnswerChange(event.target.value)}
            placeholder="먼저 사용자 영향 범위를 확인하고, 최근 변경이나 병목 후보를 빠르게 분리하겠습니다."
          />
          <div className="battle-input-footer">
            <p>
              {selectedAction
                ? selectedAction.battleFlavorText
                : '기술 설명은 버튼 안에 길게 넣지 않고, 여기서 1~2문장으로 말하게 합니다.'}
            </p>
            <button type="button" className="battle-submit-button" disabled={!canSubmit} onClick={onSubmitTurn}>
              {phase === 'judge_buffer' ? '판정 중...' : '기술 사용'}
            </button>
          </div>
        </div>

        {showIncidentBrief && (
          <div className="battle-brief-box">
            <strong className="battle-brief-title">INCIDENT BRIEF</strong>
            <p>{scenario.fullIncidentBrief}</p>
          </div>
        )}
      </section>
    );
  }

  if (phase === 'turn_resolution' && lastTurnResult) {
    return (
      <section className="panel command-panel">
        <div className="command-shell">
          <div className="battle-textbox">
            <div className="battle-textbox-topline">
              <span className="battle-textbox-speaker">JUDGE</span>
              <span className="battle-textbox-side">{lastTurnResult.score}점</span>
            </div>
            <div className="battle-textbox-body">
              <p className="battle-text-line">{lastTurnResult.effectivenessLine}</p>
              <p className="battle-text-line is-muted">{lastTurnResult.resultLine}</p>
              <p className="battle-text-line is-muted">{lastTurnResult.coachLine}</p>
            </div>
          </div>

          <div className="battle-command-menu battle-command-menu-single">
            <button type="button" className="battle-menu-button is-primary" onClick={onContinueFromResolution}>
              {currentFollowup ? '꼬리질문' : '다음'}
            </button>
          </div>
        </div>

        <div className="battle-resolution-strip">
          <strong>놓친 포인트</strong>
          <p>{lastTurnResult.missLine}</p>
        </div>
      </section>
    );
  }

  if (phase === 'followup_reveal' && currentFollowup) {
    return (
      <section className="panel command-panel">
        <div className="command-shell">
          <div className="battle-textbox">
            <div className="battle-textbox-topline">
              <span className="battle-textbox-speaker">FOLLOW-UP</span>
            </div>
            <div className="battle-textbox-body">
              <p className="battle-text-line">{currentFollowup.flavorLine}</p>
              <p className="battle-text-line is-muted">{currentFollowup.questionLine}</p>
            </div>
          </div>

          <div className="battle-command-menu battle-command-menu-single">
            <button type="button" className="battle-menu-button is-primary" onClick={onContinueFromFollowup}>
              다음
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (phase === 'state_update') {
    return (
      <section className="panel command-panel">
        <div className="command-shell">
          <div className="battle-textbox">
            <div className="battle-textbox-topline">
              <span className="battle-textbox-speaker">FIELD</span>
            </div>
            <div className="battle-textbox-body">
              {turn.revealLines.length > 0 ? (
                turn.revealLines.map((line) => (
                  <p key={line} className="battle-text-line is-muted">
                    {line}
                  </p>
                ))
              ) : (
                <p className="battle-text-line is-muted">이번 턴에는 전장 정보가 새로 드러나지 않았습니다.</p>
              )}
            </div>
          </div>

          <div className="battle-command-menu battle-command-menu-single">
            <button type="button" className="battle-menu-button is-primary" onClick={onAdvanceStateUpdate}>
              {turn.turnNumber >= scenario.turns.length ? '결과 보기' : '다음 턴'}
            </button>
          </div>
        </div>

        {turn.newStateIds.length > 0 && (
          <div className="battle-brief-box battle-state-update-box">
            <strong className="battle-brief-title">NEW FIELD EFFECT</strong>
            <div className="battle-state-update-list">
              {turn.newStateIds.map((stateId) => (
                <span key={stateId} className="battle-status-chip">
                  + {statesById[stateId]?.battleName ?? stateId}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }

  return null;
}
