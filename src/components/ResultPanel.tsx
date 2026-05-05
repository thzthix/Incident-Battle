import type { FinalResult, ScenarioContent } from '../types';

type ResultPanelProps = {
  scenario: ScenarioContent;
  finalResult: FinalResult;
  onReplay: () => void;
  onReset: () => void;
};

export function ResultPanel({ scenario, finalResult, onReplay, onReset }: ResultPanelProps) {
  return (
    <section className="panel result-panel">
      <div className="panel-heading">
        <p className="eyebrow">Final Result</p>
        <h2>{finalResult.rankLabel}</h2>
        <p>
          총점 {finalResult.totalScore}점 · {scenario.title} 전장을 마무리했습니다.
        </p>
      </div>

      <div className="result-grid">
        <div className="resolution-card">
          <strong>카테고리 점수</strong>
          {Object.entries(finalResult.categoryScores).map(([key, value]) => (
            <p key={key}>{key}: {value}</p>
          ))}
        </div>
        <div className="resolution-card">
          <strong>강점</strong>
          {finalResult.strengths.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="resolution-card">
          <strong>놓친 점</strong>
          {finalResult.misses.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="resolution-card">
          <strong>더 좋은 답변 흐름</strong>
          <p>{finalResult.betterAnswerDirection}</p>
        </div>
      </div>

      <div className="button-row">
        <button type="button" className="secondary-button" onClick={onReset}>
          처음부터
        </button>
        <button type="button" className="primary-button" onClick={onReplay}>
          같은 전장 다시 하기
        </button>
      </div>
    </section>
  );
}
