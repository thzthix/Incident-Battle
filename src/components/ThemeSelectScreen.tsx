import { statesById } from '../gameContent';
import type { ScenarioContent, ThemeCard, ThemeId } from '../types';

type ThemeSelectScreenProps = {
  themeCards: ThemeCard[];
  selectedThemeId: ThemeId;
  previewScenario: ScenarioContent;
  onSelectTheme: (themeId: ThemeId) => void;
  onStartBattle: () => void;
  onBack: () => void;
};

export function ThemeSelectScreen({
  themeCards,
  selectedThemeId,
  previewScenario,
  onSelectTheme,
  onStartBattle,
  onBack,
}: ThemeSelectScreenProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <p className="eyebrow">Theme Select</p>
        <h2>이번 판의 주제를 고르세요</h2>
        <p>세부 사건은 배틀 인트로에서 reveal되고, 여기서는 연습할 전장만 고릅니다.</p>
      </div>

      <div className="theme-grid">
        {themeCards.map((card) => {
          const selected = card.id === selectedThemeId;
          return (
            <button
              key={card.id}
              type="button"
              className={`theme-card ${selected ? 'is-selected' : ''}`}
              onClick={() => onSelectTheme(card.id)}
            >
              <span className="chip-label">{card.previewStateLabel}</span>
              <strong>{card.title}</strong>
              <p>{card.description}</p>
            </button>
          );
        })}
      </div>

      <div className="scenario-preview-card">
        <div>
          <p className="eyebrow">Scenario Preview</p>
          <h3>{previewScenario.title}</h3>
          <p>{previewScenario.fullIncidentBrief}</p>
        </div>
        <div className="state-chip-row">
          {previewScenario.startingStateIds.map((stateId) => (
            <span key={stateId} className="state-chip">
              {statesById[stateId]?.battleName ?? stateId}
            </span>
          ))}
        </div>
      </div>

      <div className="button-row">
        <button type="button" className="secondary-button" onClick={onBack}>
          이름 수정
        </button>
        <button type="button" className="primary-button" onClick={onStartBattle}>
          배틀 시작
        </button>
      </div>
    </section>
  );
}
