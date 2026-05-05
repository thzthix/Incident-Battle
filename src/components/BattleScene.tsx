import { actionsById, statesById } from '../gameContent';
import type { ActionContent, DialogueLine, ScenarioContent, ScenarioTurn } from '../types';

type BattleSceneProps = {
  companyName: string;
  playerName: string;
  scenario: ScenarioContent;
  floatingLabel: string;
  activeStateIds: string[];
  dimmedStateIds: string[];
  activeTurn: ScenarioTurn | null;
  dialogueLine: DialogueLine | null;
  selectedActionId: string;
  showIncidentBrief: boolean;
  onToggleBrief: () => void;
};

function getSelectedAction(selectedActionId: string): ActionContent | null {
  return selectedActionId ? actionsById[selectedActionId] ?? null : null;
}

const speakerLabel: Record<DialogueLine['speaker'], string> = {
  system: 'SYSTEM',
  interviewer: 'INTERVIEWER',
  coach: 'COACH',
};

export function BattleScene({
  companyName,
  playerName,
  scenario,
  floatingLabel,
  activeStateIds,
  dimmedStateIds,
  activeTurn,
  dialogueLine,
  selectedActionId,
  showIncidentBrief,
  onToggleBrief,
}: BattleSceneProps) {
  const selectedAction = getSelectedAction(selectedActionId);

  return (
    <section className="panel battle-scene-panel">
      <div className="hud-row">
        <div>
          <p className="eyebrow">Opponent HUD</p>
          <h2>{companyName} 면접관</h2>
          <p className="hud-subtitle">
            {scenario.title} · Turn {Math.min((activeTurn?.turnNumber ?? 1), scenario.turns.length)} / {scenario.turns.length}
          </p>
        </div>
        <div className="hud-badge">{scenario.difficulty}</div>
      </div>

      <div className="battle-stage">
        <div className="sprite-card opponent-sprite">INTERVIEWER</div>
        <div className="stage-center">
          <div className="floating-label">{floatingLabel}</div>
          <div className="state-chip-row">
            {activeStateIds.map((stateId) => (
              <span key={stateId} className={`state-chip ${dimmedStateIds.includes(stateId) ? 'is-dimmed' : ''}`}>
                {statesById[stateId]?.battleName ?? stateId}
              </span>
            ))}
          </div>
        </div>
        <div className="sprite-card player-sprite">{playerName}</div>
      </div>

      <div className="dialogue-box">
        <div className="dialogue-topline">
          <span className="speaker-tag">Dialogue</span>
          <button type="button" className="text-button" onClick={onToggleBrief}>
            {showIncidentBrief ? '상황 접기' : '상황 다시 보기'}
          </button>
        </div>
        {dialogueLine ? (
          <p className="dialogue-line">
            <strong>{speakerLabel[dialogueLine.speaker]}:</strong> {dialogueLine.text}
          </p>
        ) : (
          <div className="dialogue-stack">
            <p>
              <strong>질문:</strong> {activeTurn?.question}
            </p>
            {selectedAction ? (
              <p>
                <strong>선택 기술:</strong> {selectedAction.label} · {selectedAction.battleFlavorText}
              </p>
            ) : (
              <p>
                <strong>목표:</strong> {activeTurn?.goalLine}
              </p>
            )}
          </div>
        )}
        {showIncidentBrief && (
          <div className="incident-brief">
            <p>{scenario.fullIncidentBrief}</p>
          </div>
        )}
      </div>
    </section>
  );
}
