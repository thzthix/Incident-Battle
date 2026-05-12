import type { FinalResult, ScenarioContent } from '../types';

type ResultPanelProps = {
  scenario: ScenarioContent;
  finalResult: FinalResult;
  onReplay: () => void;
  onReset: () => void;
};

export function ResultPanel({ scenario, finalResult, onReplay, onReset }: ResultPanelProps) {
  const scoreEntries = Object.entries(finalResult.categoryScores);
  const categoryLabels: Record<string, string> = {
    triage: '초기 판단',
    diagnosis: '원인 추론',
    mitigation: '즉시 대응',
    communication: '설명 명확성',
    reasoning: '판단 근거',
  };
  const bestCategory = scoreEntries.reduce((best, current) => (current[1] > best[1] ? current : best));
  const weakestCategory = scoreEntries.reduce((worst, current) => (current[1] < worst[1] ? current : worst));
  const nextTryChecklist = [
    finalResult.misses[0],
    finalResult.misses[1],
    finalResult.betterAnswerDirection,
  ].filter(Boolean);

  return (
    <section className="panel result-panel">
      <div className="panel-heading result-heading">
        <div className="result-heading-copy">
          <p className="eyebrow">Final Result</p>
          <h2>{finalResult.rankLabel}</h2>
          <p>
            총점 {finalResult.totalScore}점 · {scenario.title} 전장을 마무리했습니다.
          </p>
        </div>
        <div className="result-score-badge" aria-label={`총점 ${finalResult.totalScore}점`}>
          <span className="result-score-label">TOTAL</span>
          <strong className="result-score-value">{finalResult.totalScore}</strong>
          <span className="helper-copy">다음 판에서 다시 넘을 기준점</span>
        </div>
      </div>

      <div className="result-hero-card">
        <div className="result-summary-block">
          <strong className="result-section-title">총평</strong>
          <p className="result-summary-copy">
            이번 판에선 <strong>{categoryLabels[bestCategory[0]]}</strong>이 가장 좋았고,{' '}
            <strong>{categoryLabels[weakestCategory[0]]}</strong>을 더 빠르게 정리하면 답변이 한 단계 또렷해집니다.
          </p>
          <p className="helper-copy">좋은 답을 외우기보다, 먼저 무엇을 확인하고 왜 그 순서인지 한 줄로 꺼내는 감각을 키우는 판입니다.</p>
          <div className="score-grid result-score-grid">
            {scoreEntries.map(([key, value]) => (
              <span
                key={key}
                className={`${key === bestCategory[0] ? 'is-best' : ''} ${key === weakestCategory[0] ? 'is-weak' : ''}`}
              >
                <strong>{categoryLabels[key] ?? key}</strong>
                <em>{value}점</em>
              </span>
            ))}
          </div>
        </div>

        <div className="result-score-block">
          <strong className="result-section-title">다음 시도 체크리스트</strong>
          <ol className="result-checklist">
            {nextTryChecklist.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="result-grid">
        <div className="resolution-card result-card-list">
          <div className="section-topline">
            <strong className="result-section-title">잘한 점</strong>
            <span className="chip-label">계속 가져갈 것</span>
          </div>
          <ul className="result-bullet-list">
            {finalResult.strengths.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="resolution-card result-card-list is-warning">
          <div className="section-topline">
            <strong className="result-section-title">놓친 점</strong>
            <span className="chip-label">다음 판 보강</span>
          </div>
          <ul className="result-bullet-list">
            {finalResult.misses.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="resolution-card result-direction-card">
        <div className="section-topline">
          <strong className="result-section-title">더 좋은 답변 흐름</strong>
          <span className="chip-label">지금 바로 다시 말해보기</span>
        </div>
        <p className="result-direction-copy">{finalResult.betterAnswerDirection}</p>
      </div>

      <div className="button-row result-button-row">
        <button type="button" className="secondary-button" onClick={onReset}>
          처음부터
        </button>
        <button type="button" className="primary-button" onClick={onReplay}>
          같은 전장 다시 도전하기
        </button>
      </div>
      <p className="helper-copy result-cta-copy">가장 약했던 축 하나만 의식해서 다시 말하면 체감이 가장 큽니다.</p>
    </section>
  );
}
