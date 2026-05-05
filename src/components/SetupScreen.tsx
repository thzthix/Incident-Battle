type SetupScreenProps = {
  companyName: string;
  playerName: string;
  onCompanyNameChange: (value: string) => void;
  onPlayerNameChange: (value: string) => void;
  onContinue: () => void;
};

export function SetupScreen({
  companyName,
  playerName,
  onCompanyNameChange,
  onPlayerNameChange,
  onContinue,
}: SetupScreenProps) {
  return (
    <section className="panel form-panel">
      <div className="panel-heading">
        <p className="eyebrow">Setup</p>
        <h2>이번 판의 이름을 정하세요</h2>
        <p>회사명과 플레이어 이름만 정하면 곧바로 전장 선택으로 넘어갑니다.</p>
      </div>
      <div className="form-grid">
        <label className="field">
          <span>회사명</span>
          <input value={companyName} maxLength={24} onChange={(event) => onCompanyNameChange(event.target.value)} />
        </label>
        <label className="field">
          <span>플레이어 이름</span>
          <input value={playerName} maxLength={16} onChange={(event) => onPlayerNameChange(event.target.value)} />
        </label>
      </div>
      <button type="button" className="primary-button wide-button" onClick={onContinue}>
        전장 고르기
      </button>
    </section>
  );
}
