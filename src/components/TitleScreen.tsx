import type { ThemeCard } from '../types';

type TitleScreenProps = {
  previewTheme: ThemeCard;
  onStart: () => void;
};

export function TitleScreen({ previewTheme, onStart }: TitleScreenProps) {
  return (
    <section className="panel hero-panel title-panel">
      <div className="hero-copy">
        <p className="eyebrow">First Playable</p>
        <h1>Incident Battle</h1>
        <p className="hero-text">
          면접관의 질문볼에서 튀어나온 시나리오를 3턴 안에 읽고, 대응 순서와 답변 구조를 방어하는 배틀형 연습장입니다.
        </p>
        <button type="button" className="primary-button" onClick={onStart}>
          배틀 준비
        </button>
      </div>
      <div className="hero-preview">
        <span className="chip-label">현재 추천 전장</span>
        <strong>{previewTheme.title}</strong>
        <p>{previewTheme.description}</p>
      </div>
    </section>
  );
}
