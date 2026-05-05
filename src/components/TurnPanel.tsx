import { actionsById, statesById } from '../gameContent';
import type { BattlePhase, ScenarioFollowup, ScenarioTurn, TurnResult } from '../types';

type TurnPanelProps = {
  phase: BattlePhase;
  turn: ScenarioTurn | null;
  selectedActionId: string;
  answerText: string;
  lastTurnResult: TurnResult | null;
  currentFollowup: ScenarioFollowup | null;
  onAdvanceIntro: () => void;
  onSelectAction: (actionId: string) => void;
  onAnswerChange: (value: string) => void;
  onSubmitTurn: () => void;
  onContinueFromResolution: () => void;
  onContinueFromFollowup: () => void;
  onAdvanceStateUpdate: () => void;
};

export function TurnPanel({
  phase,
  turn,
  selectedActionId,
  answerText,
  lastTurnResult,
  currentFollowup,
  onAdvanceIntro,
  onSelectAction,
  onAnswerChange,
  onSubmitTurn,
  onContinueFromResolution,
  onContinueFromFollowup,
  onAdvanceStateUpdate,
}: TurnPanelProps) {
  if (phase === 'battle_intro') {
    return (
      <section className="panel action-panel">
        <div className="panel-heading">
          <p className="eyebrow">Battle Intro</p>
          <h3>질문볼에서 인시던트가 펼쳐집니다</h3>
          <p>한 줄씩 읽고 전장에 입장하세요.</p>
        </div>
        <button type="button" className="primary-button wide-button" onClick={onAdvanceIntro}>
          다음
        </button>
      </section>
    );
  }

  if (!turn) {
    return null;
  }

  if (phase === 'action_select' || phase === 'answer_input' || phase === 'judge_buffer') {
    return (
      <section className="panel action-panel">
        <div className="panel-heading">
          <p className="eyebrow">Turn {turn.turnNumber}</p>
          <h3>{turn.goalLine}</h3>
          <p>{turn.question}</p>
        </div>

        <div className="action-grid">
          {turn.candidateActionIds.map((actionId) => {
            const action = actionsById[actionId];
            const selected = selectedActionId === actionId;
            return (
              <button
                key={actionId}
                type="button"
                className={`action-card ${selected ? 'is-selected' : ''}`}
                onClick={() => onSelectAction(actionId)}
              >
                <span className="chip-label">{action.category}</span>
                <strong>{action.label}</strong>
                <p>{action.battleFlavorText}</p>
              </button>
            );
          })}
        </div>

        <label className="field field-stack">
          <span>답변</span>
          <textarea
            rows={5}
            value={answerText}
            onChange={(event) => onAnswerChange(event.target.value)}
            placeholder="먼저 사용자 영향과 범위를 나누고, 어떤 신호를 먼저 확인할지 1~2문장으로 적어보세요."
          />
        </label>

        <div className="button-row">
          <span className="helper-copy">최소 8자 · 1~2문장 권장</span>
          <button
            type="button"
            className="primary-button"
            disabled={!selectedActionId || answerText.trim().length < 8 || phase === 'judge_buffer'}
            onClick={onSubmitTurn}
          >
            {phase === 'judge_buffer' ? '판정 중...' : '턴 제출'}
          </button>
        </div>
      </section>
    );
  }

  if (phase === 'turn_resolution' && lastTurnResult) {
    return (
      <section className="panel action-panel">
        <div className="panel-heading">
          <p className="eyebrow">Turn Resolution</p>
          <h3>{lastTurnResult.effectivenessLine}</h3>
          <p>{lastTurnResult.resultLine}</p>
        </div>
        <div className="resolution-card">
          <p>{lastTurnResult.coachLine}</p>
          <p className="warn-copy">{lastTurnResult.missLine}</p>
          <div className="score-grid">
            {Object.entries(lastTurnResult.breakdown).map(([key, value]) => (
              <span key={key}>{key} {value}</span>
            ))}
          </div>
        </div>
        <button type="button" className="primary-button wide-button" onClick={onContinueFromResolution}>
          {currentFollowup ? '꼬리질문 보기' : '상태 갱신'}
        </button>
      </section>
    );
  }

  if (phase === 'followup_reveal' && currentFollowup) {
    return (
      <section className="panel action-panel">
        <div className="panel-heading">
          <p className="eyebrow">Follow-up</p>
          <h3>{currentFollowup.techniqueLabel}</h3>
          <p>{currentFollowup.flavorLine}</p>
        </div>
        <div className="resolution-card">
          <strong>{currentFollowup.questionLine}</strong>
        </div>
        <button type="button" className="primary-button wide-button" onClick={onContinueFromFollowup}>
          상태 갱신
        </button>
      </section>
    );
  }

  if (phase === 'state_update') {
    return (
      <section className="panel action-panel">
        <div className="panel-heading">
          <p className="eyebrow">State Update</p>
          <h3>전장이 다음 턴으로 이동합니다</h3>
          <p>새로 공개된 단서를 읽고 다음 대응으로 넘어가세요.</p>
        </div>
        <div className="resolution-card">
          {turn.revealLines.length > 0 ? (
            turn.revealLines.map((line) => <p key={line}>{line}</p>)
          ) : (
            <p>이번 턴에 새 reveal은 없지만, 이전 선택의 결과가 다음 판단 기준이 됩니다.</p>
          )}
          <div className="state-chip-row">
            {turn.newStateIds.map((stateId) => (
              <span key={stateId} className="state-chip">+ {statesById[stateId]?.battleName ?? stateId}</span>
            ))}
          </div>
        </div>
        <button type="button" className="primary-button wide-button" onClick={onAdvanceStateUpdate}>
          다음
        </button>
      </section>
    );
  }

  return null;
}
