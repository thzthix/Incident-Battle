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
  const trimmedAnswer = answerText.trim();
  const selectedAction = selectedActionId ? actionsById[selectedActionId] : null;
  const canSubmit = Boolean(selectedActionId) && trimmedAnswer.length >= 8 && phase !== 'judge_buffer';
  const answerLength = trimmedAnswer.length;

  if (phase === 'battle_intro') {
    return (
      <section className="panel action-panel">
        <div className="dialogue-box turn-dialogue-box">
          <div className="dialogue-topline">
            <span className="speaker-tag">SYSTEM</span>
            <span className="eyebrow">Battle Intro</span>
          </div>
          <strong className="turn-callout">질문볼에서 인시던트가 펼쳐집니다.</strong>
          <p className="dialogue-line">상황을 한 줄씩 확인한 뒤, 첫 대응을 고를 준비를 해보세요.</p>
        </div>
        <div className="command-footer">
          <p className="helper-copy">다음 대사로 넘기면 첫 질문이 시작됩니다.</p>
          <button type="button" className="primary-button wide-button" onClick={onAdvanceIntro}>
            전장 진입
          </button>
        </div>
      </section>
    );
  }

  if (!turn) {
    return null;
  }

  if (phase === 'action_select' || phase === 'answer_input' || phase === 'judge_buffer') {
    return (
      <section className="panel action-panel">
        <div className="dialogue-box turn-dialogue-box">
          <div className="dialogue-topline">
            <span className="speaker-tag">TURN {turn.turnNumber}</span>
            <span className="eyebrow">질문 도착</span>
          </div>
          <p className="turn-goal-line">{turn.goalLine}</p>
          <strong className="turn-callout">{turn.question}</strong>
          <p className="dialogue-line">어떤 기술로 대응할지 고르고, 왜 그 행동을 먼저 쓰는지 짧게 설명하세요.</p>
        </div>

        <div className="turn-guide-card">
          <div className="section-topline">
            <span className="speaker-tag">FLOW</span>
            <span className="helper-copy">이번 턴은 두 단계만 버티면 됩니다.</span>
          </div>
          <div className="turn-guide-step">
            <span className="guide-step-number">1</span>
            <div>
              <strong>기술 선택</strong>
              <p className="dialogue-line">먼저 지금 전장에서 가장 먼저 쓸 대응 기술 1개를 고르세요.</p>
            </div>
          </div>
          <div className="turn-guide-step">
            <span className="guide-step-number">2</span>
            <div>
              <strong>짧은 설명</strong>
              <p className="dialogue-line">왜 그 기술을 먼저 쓰는지 1~2문장으로 적으면 제출할 수 있습니다.</p>
            </div>
          </div>
        </div>

        <div className="turn-command-section">
          <div className="section-topline">
            <span className="speaker-tag">COMMAND</span>
            <span className="helper-copy">어떤 기술을 쓰겠습니까?</span>
          </div>
          <div className="action-grid">
            {turn.candidateActionIds.map((actionId, index) => {
              const action = actionsById[actionId];
              const selected = selectedActionId === actionId;
              return (
                <button
                  key={actionId}
                  type="button"
                  className={`action-card battle-action-card ${selected ? 'is-selected' : ''}`}
                  onClick={() => onSelectAction(actionId)}
                  aria-pressed={selected}
                >
                  <div className="action-card-topline">
                    <span className="action-slot">#{index + 1}</span>
                    <span className="chip-label">{action.category}</span>
                  </div>
                  <strong>{action.label}</strong>
                  <p>{action.battleFlavorText}</p>
                  <span className="action-card-cta">{selected ? '선택됨' : '기술 선택'}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`selection-status-card battle-selection-card ${selectedAction ? 'is-ready' : ''}`}>
          <div className="section-topline">
            <span className="speaker-tag">SELECTED</span>
            <span className="helper-copy">현재 대응 기술</span>
          </div>
          {selectedAction ? (
            <>
              <strong>{selectedAction.label}</strong>
              <p>{selectedAction.battleFlavorText}</p>
            </>
          ) : (
            <>
              <strong>아직 행동을 고르지 않았습니다</strong>
              <p>먼저 어떤 대응을 우선할지 선택하면 답변 방향이 더 쉬워집니다.</p>
            </>
          )}
        </div>

        <div className="response-console">
          <div className="section-topline">
            <span className="speaker-tag">ANSWER</span>
            <span className="helper-copy">최소 8자 · 1~2문장 권장</span>
          </div>
          <label className="field field-stack">
            <span className="response-label">왜 이 기술을 먼저 쓰는지 설명하세요</span>
            <textarea
              rows={5}
              value={answerText}
              onChange={(event) => onAnswerChange(event.target.value)}
              placeholder="먼저 사용자 영향과 범위를 확인하고, 최근 변경이나 병목 후보를 빠르게 분리하겠습니다."
            />
            <div className="answer-help-row">
              <span className="helper-copy">예: 사용자 영향부터 확인하고, 최근 변경과 장애 시점을 함께 보겠습니다.</span>
              <span className={`answer-length ${answerLength >= 8 ? 'is-valid' : ''}`}>{answerLength}자</span>
            </div>
          </label>
        </div>

        <div className="submit-card battle-submit-card">
          <div className="submit-status-copy">
            <strong>{canSubmit ? '기술 사용 준비 완료' : '기술 사용 전에 두 가지를 확인하세요'}</strong>
            <p>
              {!selectedActionId
                ? '행동 기술을 1개 선택해야 합니다.'
                : answerLength < 8
                  ? '답변 설명을 최소 8자 이상 적어야 합니다.'
                  : phase === 'judge_buffer'
                    ? '면접관이 답변을 판정하고 있습니다.'
                    : '이제 턴을 제출하고 판정을 받을 수 있습니다.'}
            </p>
          </div>
          <div className="button-row battle-button-row">
            <span className="helper-copy">{selectedActionId ? '기술과 답변이 준비됐습니다.' : '먼저 기술을 선택하세요.'}</span>
            <button
              type="button"
              className="primary-button"
              disabled={!canSubmit}
              onClick={onSubmitTurn}
            >
              {phase === 'judge_buffer' ? '판정 중...' : '기술 사용'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (phase === 'turn_resolution' && lastTurnResult) {
    return (
      <section className="panel action-panel">
        <div className="dialogue-box turn-dialogue-box">
          <div className="dialogue-topline">
            <span className="speaker-tag">JUDGE</span>
            <span className="eyebrow">Turn Resolution</span>
          </div>
          <strong className="turn-callout">{lastTurnResult.effectivenessLine}</strong>
          <p className="dialogue-line">{lastTurnResult.resultLine}</p>
        </div>
        <div className="resolution-card battle-resolution-card">
          <div className="section-topline">
            <span className="speaker-tag">COACH</span>
            <span className="helper-copy">{lastTurnResult.actionLabel} 사용 결과</span>
          </div>
          <p>{lastTurnResult.coachLine}</p>
          <p className="warn-copy">{lastTurnResult.missLine}</p>
          <div className="score-grid">
            {Object.entries(lastTurnResult.breakdown).map(([key, value]) => (
              <span key={key}>{key} {value}</span>
            ))}
          </div>
        </div>
        <div className="command-footer">
          <p className="helper-copy">
            {currentFollowup ? '면접관이 바로 꼬리질문을 이어갑니다.' : '이번 턴 판정을 반영해 전장이 갱신됩니다.'}
          </p>
          <button type="button" className="primary-button wide-button" onClick={onContinueFromResolution}>
            {currentFollowup ? '꼬리질문 보기' : '상태 갱신'}
          </button>
        </div>
      </section>
    );
  }

  if (phase === 'followup_reveal' && currentFollowup) {
    return (
      <section className="panel action-panel">
        <div className="dialogue-box turn-dialogue-box">
          <div className="dialogue-topline">
            <span className="speaker-tag">FOLLOW-UP</span>
            <span className="eyebrow">추가 압박</span>
          </div>
          <p className="turn-goal-line">{currentFollowup.techniqueLabel}</p>
          <strong className="turn-callout">{currentFollowup.flavorLine}</strong>
        </div>
        <div className="resolution-card battle-resolution-card">
          <div className="section-topline">
            <span className="speaker-tag">INTERVIEWER</span>
            <span className="helper-copy">답변의 근거를 더 묻습니다.</span>
          </div>
          <strong>{currentFollowup.questionLine}</strong>
        </div>
        <div className="command-footer">
          <p className="helper-copy">이 질문을 기억한 채 다음 전장 갱신으로 넘어갑니다.</p>
          <button type="button" className="primary-button wide-button" onClick={onContinueFromFollowup}>
            상태 갱신
          </button>
        </div>
      </section>
    );
  }

  if (phase === 'state_update') {
    return (
      <section className="panel action-panel">
        <div className="dialogue-box turn-dialogue-box">
          <div className="dialogue-topline">
            <span className="speaker-tag">FIELD</span>
            <span className="eyebrow">State Update</span>
          </div>
          <strong className="turn-callout">전장이 다음 턴으로 이동합니다.</strong>
          <p className="dialogue-line">새로 공개된 단서를 읽고 다음 대응으로 넘어가세요.</p>
        </div>
        <div className="resolution-card battle-resolution-card">
          <div className="section-topline">
            <span className="speaker-tag">REVEAL</span>
            <span className="helper-copy">새 정보가 전장에 추가됩니다.</span>
          </div>
          {turn.revealLines.length > 0 ? (
            <div className="reveal-stack">
              {turn.revealLines.map((line) => <p key={line}>{line}</p>)}
            </div>
          ) : (
            <p>이번 턴에 새 reveal은 없지만, 이전 선택의 결과가 다음 판단 기준이 됩니다.</p>
          )}
          <div className="state-chip-row">
            {turn.newStateIds.map((stateId) => (
              <span key={stateId} className="state-chip">+ {statesById[stateId]?.battleName ?? stateId}</span>
            ))}
          </div>
        </div>
        <div className="command-footer">
          <p className="helper-copy">다음 턴에서는 이 상태들이 판단 우선순위를 흔듭니다.</p>
          <button type="button" className="primary-button wide-button" onClick={onAdvanceStateUpdate}>
            다음 턴
          </button>
        </div>
      </section>
    );
  }

  return null;
}
