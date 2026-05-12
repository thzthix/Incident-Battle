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
    <section className="panel theme-select-panel">
      <div className="panel-heading">
        <p className="eyebrow">Battle Select</p>
        <h2>어떤 상대와 승부할까?</h2>
        <p>세부 사건은 질문볼에서 튀어나오고, 여기서는 어떤 배틀 타입에 들어갈지만 고릅니다.</p>
      </div>

      <div className="battle-select-layout">
        <div className="battle-choice-menu">
          {themeCards.map((card) => {
            const selected = card.id === selectedThemeId;
            return (
              <button
                key={card.id}
                type="button"
                className={`menu-choice-button ${selected ? 'is-selected' : ''}`}
                onClick={() => onSelectTheme(card.id)}
              >
                <span className="menu-choice-label">{card.title}</span>
                <span className="menu-choice-meta">{card.previewStateLabel}</span>
              </button>
            );
          })}
        </div>

        <div className="battle-select-preview">
          <p className="eyebrow">Preview</p>
          <h3>{previewScenario.title}</h3>
          <p>{previewScenario.openingGoalLine}</p>
          <div className="battle-preview-state-row">
            {previewScenario.startingStateIds.map((stateId) => (
              <span key={stateId} className="battle-status-chip">
                {statesById[stateId]?.battleName ?? stateId}
              </span>
            ))}
          </div>
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
