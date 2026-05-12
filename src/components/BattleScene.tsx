import { statesById } from '../gameContent';
import type { ScenarioContent, ScenarioTurn } from '../types';

type BattleSceneProps = {
  companyName: string;
  playerName: string;
  scenario: ScenarioContent;
  floatingLabel: string;
  activeStateIds: string[];
  dimmedStateIds: string[];
  activeTurn: ScenarioTurn | null;
  isIntro: boolean;
};

function clampGauge(value: number) {
  return Math.max(10, Math.min(100, value));
}

export function BattleScene({
  companyName,
  playerName,
  scenario,
  floatingLabel,
  activeStateIds,
  dimmedStateIds,
  activeTurn,
  isIntro,
}: BattleSceneProps) {
  const turnNumber = activeTurn?.turnNumber ?? 1;
  const visibleStateIds = activeStateIds.slice(0, 3);
  const hiddenStateCount = Math.max(activeStateIds.length - visibleStateIds.length, 0);
  const opponentGauge = clampGauge(92 - dimmedStateIds.length * 18 - Math.max(turnNumber - 1, 0) * 6);
  const playerGauge = clampGauge(96 - Math.max(turnNumber - 1, 0) * 10);

  return (
    <section className={`panel battle-scene-panel ${isIntro ? 'is-intro' : ''}`}>
      <div className="battlefield-frame">
        <div className="battlefield-sky" aria-hidden="true" />
        <div className="battlefield-ground" aria-hidden="true" />

        <div className="battle-hud battle-hud-opponent">
          <div className="battle-hud-topline">
            <strong className="battle-species-name">{scenario.title}</strong>
            <span className="battle-level">Lv50</span>
          </div>
          <div className="battle-hp-row">
            <span className="battle-hp-label">HP</span>
            <span className="battle-hp-track">
              <span className="battle-hp-fill" style={{ width: `${opponentGauge}%` }} />
            </span>
          </div>
          <p className="battle-hud-meta">{companyName} 면접관의 시나리오</p>
        </div>

        <div className="battle-hud battle-hud-player">
          <div className="battle-hud-topline">
            <strong className="battle-species-name">{playerName}</strong>
            <span className="battle-level">Lv50</span>
          </div>
          <div className="battle-hp-row">
            <span className="battle-hp-label">HP</span>
            <span className="battle-hp-track">
              <span className="battle-hp-fill is-player" style={{ width: `${playerGauge}%` }} />
            </span>
          </div>
          <p className="battle-hud-meta">침착도 {playerGauge} / 100</p>
        </div>

        <p className="battle-opponent-trainer">{companyName} 면접관</p>

        <div className="battle-status-rack" aria-label="현재 전장 상태">
          {visibleStateIds.map((stateId) => (
            <span key={stateId} className={`battle-status-chip ${dimmedStateIds.includes(stateId) ? 'is-dimmed' : ''}`}>
              {statesById[stateId]?.battleName ?? stateId}
            </span>
          ))}
          {hiddenStateCount > 0 && <span className="battle-status-chip is-more">+{hiddenStateCount}</span>}
        </div>

        <div className="battle-effect-banner">
          <span className="battle-effect-label">FIELD</span>
          <strong>{floatingLabel}</strong>
        </div>

        <div className="battle-platform battle-platform-opponent">
          {isIntro && (
            <div className="question-ball-sequence" aria-hidden="true">
              <span className="question-ball-trail" />
              <span className="question-ball-shadow" />
              <span className="question-ball" />
              <span className="question-ball-impact" />
            </div>
          )}
          <div className="scenario-sprite">
            <span className="scenario-sprite-core">?</span>
            <span className="scenario-sprite-name">{scenario.title}</span>
            <span className="scenario-sprite-role">SCENARIO</span>
          </div>
        </div>

        <div className="battle-platform battle-platform-player">
          <div className="player-sprite-silhouette" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
